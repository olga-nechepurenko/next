export type BlogPostRest = {
    id: number;
    slug: string;
    date: string;
    title: { rendered: string };
    content: { rendered: string };
    excerpt: { rendered: string };
};

export type BlogImageRest = {};

export type Blog = {
    id: number;
    date: string;
    slug: string;
    link: string;
    title: { rendered: string };
    content: {
        rendered: string;
        protected: boolean;
    };
    excerpt: {
        rendered: string;
        protected: boolean;
    };
    author: number;
    featured_media: number;
    categories: number[];
};

export type Author = {
    embeddable: boolean;
    href: string;
};

export type BlogMedia = {
    id: number;
    date: string;
    date_gmt: string;
    guid: {
        rendered: string;
    };
    modified: string;
    modified_gmt: string;
    slug: string;
    status: string;
    type: string;
    link: string;
    title: {
        rendered: string;
    };
    author: number;
    featured_media: number;
    comment_status: string;
    ping_status: string;
    template: string;
    description: {
        rendered: string;
    };
    caption: {
        rendered: string;
    };
    alt_text: string;
    media_type: string;
    mime_type: string;
    media_details: {
        width: number;
        height: number;
        file: string;
        image_meta: {
            aperture: string;
            credit: string;
            camera: string;
            caption: string;
            created_timestamp: string;
            copyright: string;
            focal_length: string;
            iso: string;
            shutter_speed: string;
            title: string;
            orientation: string;
            keywords: any[];
        };
        original_image: string;
    };
    source_url: string;
};

export type BlogPostTeaserGql = {
    title: string;
    slug: string;
    date: string;
    excerpt: string;
    featured_media: number;
};

export type BlogPostMetaGql = Pick<BlogPostTeaserGql, "slug">;

export type BlogPostGql = {
    content: string;
    title: string;
    date: string;
    featuredImage?: {
        node: {
            altText: string;
            guid: string;
            mediaDetails: {
                width: number;
                height: number;
            };
        };
    };
    author: {
        node: {
            firstName: string;
            lastName: string;
            name: string;
        };
    };
};
