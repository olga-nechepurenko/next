import type { BlogMedia, Blog } from "@/types/blog-types";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

const WP_REST_BASE = process.env.WP_REST_BASE;

type Props = {
    params: {
        slug: string;
    };
};

export default async function SingleBlogPage({ params: { slug } }: Props) {
    const { title, date, content, featured_media } = await getPostData(slug);

    const imageData = await getImageData(featured_media);

    return (
        <div>
            <header>
                <h1>{title.rendered}</h1>
                <time dateTime={date.substring(0, 10)}>
                    {new Date(date).toLocaleDateString("de")}
                </time>
            </header>
            {/* Bild, falls Bilddaten vorhanden, mit der Image-Komponente darstellen */}

            {imageData && (
                <Image
                    className="full-width-image"
                    src={imageData.guid.rendered}
                    alt={imageData.alt_text}
                    {...imageData.media_details}
                />
            )}
            {/* Hier den content in einem div darstellen */}
            <div dangerouslySetInnerHTML={{ __html: content.rendered }} />
        </div>
    );
}

/* Daten des zum Slug passenden Beitrags laden. Falls kein Beitrag gefunden
wurde, die not-found-Seite anzeigen.
Beispiel-URL: https://react.webworker.berlin/wp-json/wp/v2/posts?slug=react-rockt
ACHTUNG: Antwort kommt als Array mit einem Objekt, nicht direkt als Objekt.
*/
async function getPostData(slug: string) {
    const response = await fetch(`${WP_REST_BASE}/posts?slug=${slug}`, {
        next: {
            revalidate: 600,
        },
    });

    const posts = (await response.json()) as Blog[];

    const post = posts[0];

    if (!post) {
        notFound();
    }

    return post;
}

/* Bilddaten laden, falls der Beitrag ein Titelbild hat.
Beispiel-URL: https://react.webworker.berlin/wp-json/wp/v2/media/5
*/
async function getImageData(imageId: number) {
    if (!imageId) {
        return null;
    }

    const response = await fetch(`${WP_REST_BASE}/media/${imageId}`, {
        next: {
            revalidate: 600,
        },
    });

    if (!response.ok) {
        return null;
    }

    const imageData = (await response.json()) as BlogMedia;

    return imageData;
}

/* Dynamisch den Titel in Metadaten einfügen */

export async function generateMetadata({
    params: { slug },
}: Props): Promise<Metadata> {
    const { title } = await getPostData(slug);

    return {
        title: title.rendered,
    };
}

export async function generateStaticParams() {
    const response = await fetch(`${WP_REST_BASE}/posts`);
    const posts = (await response.json()) as Blog[];

    return posts.map((post) => post.slug);
}
