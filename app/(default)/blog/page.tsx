import BlogTeaserRest from "@/components/Blog/BlogTeaserRest";
import { BlogPostRest } from "@/types/blog-types";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog",
};

const WP_REST_BASE = process.env.WP_REST_BASE;

export default async function BlogPage() {
    const response = await fetch(`${WP_REST_BASE}/posts`, {
        next: {
            revalidate: 600,
        },
    });

    const posts = (await response.json()) as BlogPostRest[];
    return (
        <>
            <h1>Blog</h1>
            {posts.map((post) => (
                <BlogTeaserRest key={post.id} {...post} />
            ))}
        </>
    );
}
