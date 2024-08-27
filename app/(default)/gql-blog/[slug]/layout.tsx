import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

export default function DefaultBlogLayoutGql({ children }: Props) {
    return (
        <>
            {children}
            <Link href="/gql-blog">Zurück zum Blogs</Link>
        </>
    );
}
