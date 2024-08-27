import ProductTeaser from "@/components/ProductTeaser";
import type { Product } from "@/types/shop-types";
import { Metadata } from "next";

import { capitalize } from "es-toolkit/string";

type Props = {
    params: {
        // Alles aus der URL ist vom Typ String. id entspricht Ordnernamen [name]
        name: string;
    };
};

export default async function SingleCategoryPage({ params: { name } }: Props) {
    const response = await fetch(
        `https://fakestoreapi.com/products/category/${getCategoryNameFromUrl(
            name
        )}`,
        {
            cache: "force-cache",
        }
    );

    const products: Product[] = (await response.json()) as Product[];

    return (
        <div>
            <h1>{capitalize(getCategoryNameFromUrl(name))}</h1>
            <div className="product-teasers grid">
                {products.map((product) => (
                    <ProductTeaser key={product.id} {...product} />
                ))}
            </div>
        </div>
    );
}

export function getCategoryNameFromUrl(name: string): string {
    if (typeof name === "string" && name.length > 1) {
        name = name.split("-").join(" ");
    }
    return name;
}

/*
Für dynamische Metadaten, die nicht fest in die Datei geschrieben werden können,
kann man eine asynchrone Funktion mit dem vorgegebenen Namen generateMetadata
exportieren.
https://nextjs.org/docs/app/api-reference/functions/generate-metadata
*/
export async function generateMetadata({
    params: { name },
}: Props): Promise<Metadata> {
    const title = `Shop-${getCategoryNameFromUrl(name)}`;

    return {
        title,
    };
}
