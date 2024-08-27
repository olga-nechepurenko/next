import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

export default function DefaultBlogLayout({ children }: Props) {
    return (
        <>
            {children}
            <Link href="/blog">Zurück zum Blogs</Link>
        </>
    );
}
