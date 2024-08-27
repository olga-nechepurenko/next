import BlogTeaserGql from "@/components/Blog/BlogTeaserGql";
import { BlogPostTeaserGql } from "@/types/blog-types";
import request, { gql } from "graphql-request";
import type { Metadata } from "next";

const WP_GRAPHQL_BASE = process.env.WP_GRAPHQL_BASE!;

export const metadata: Metadata = {
    title: "Blog",
};

export const revalidate = 600;

export default async function GqlBlogPage() {
    /*
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates
  */
    const query = gql`
        {
            posts {
                nodes {
                    title
                    slug
                    date
                    excerpt
                }
            }
        }
    `;

    const response = (await request(WP_GRAPHQL_BASE, query)) as {
        posts: { nodes: Array<BlogPostTeaserGql> };
    };

    return (
        <>
            <h1>Blog</h1>
            {response.posts.nodes.map((post) => {
                return <BlogTeaserGql key={post.slug} {...post} />;
            })}
        </>
    );
}
