import type { BlogPostGql, BlogPostMetaGql } from "@/types/blog-types";
import request, { gql } from "graphql-request";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

const WP_GRAPHQL_BASE = process.env.WP_GRAPHQL_BASE!;

type Props = {
    params: {
        slug: string;
    };
};

export default async function SingleBlogPageGql({ params: { slug } }: Props) {
    const response = await getPostGqlData(slug);

    return (
        <>
            <h1>{response.post.title}</h1>
            <time dateTime={response.post.date.substring(0, 10)}>
                {new Date(response.post.date).toLocaleDateString("de")}
            </time>
            {response.post?.featuredImage?.node?.guid && (
                <Image
                    className="full-width-image"
                    src={response.post.featuredImage.node.guid}
                    alt={response.post.featuredImage.node.altText}
                    width={response.post.featuredImage.node.mediaDetails.width}
                    height={
                        response.post.featuredImage.node.mediaDetails.height
                    }
                />
            )}
            <div dangerouslySetInnerHTML={{ __html: response.post.content }} />
        </>
    );
}

async function getPostGqlData(slug: string) {
    const query = gql`
        {
            post(id: "${slug}", idType: SLUG) {
                content
                date
                title
                featuredImage {
                    node {
                        altText
                        guid
                        mediaDetails {
                            width
                            height
                        }
                    }
                }
                author {
                    node {
                        firstName
                        lastName
                        name
                    }
                }
            }
        }
    `;

    const response = (await request(WP_GRAPHQL_BASE, query)) as {
        post: BlogPostGql;
    };

    if (!response) {
        notFound();
    }

    return response;
}

/* Dynamisch den Titel in Metadaten einfügen */

export async function generateMetadata({
    params: { slug },
}: Props): Promise<Metadata> {
    const response = await getPostGqlData(slug);

    return {
        title: response.post.title,
    };
}

export async function generateStaticParams() {
    const query = gql`
        {
            posts {
                nodes {
                    slug
                }
            }
        }
    `;
    const response = (await request(WP_GRAPHQL_BASE, query)) as {
        posts: { nodes: Array<BlogPostMetaGql> };
    };
    return response.posts.nodes.map((post) => post.slug);
}
