import ProductTeaser from "@/components/ProductTeaser";
import { Product } from "@/types/shop-types";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Shop",
    description: "best shop",
};

export default async function ShopPage() {
    const response = await fetch("https://fakestoreapi.com/products", {
        cache: "force-cache",
    });

    const products: Product[] = (await response.json()) as Product[];
    return (
        <div>
            <h1>Shop</h1>
            <div className="product-teasers grid">
                {products.map((product) => (
                    <ProductTeaser key={product.id} {...product} />
                ))}
            </div>
        </div>
    );
}
