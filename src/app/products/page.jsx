import ProductGrid from "@/components/product/ProductGrid";
import { getProducts } from "@/lib/actions";

export const metadata = {
    title: "Products · React Store",
};

export default async function ProductsPage() {
    const products = await getProducts();

    return (
        <div className="shell py-12 sm:py-16">
            <header className="mb-10 flex flex-wrap items-end justify-between gap-4">
                <div>
                    <p className="eyebrow mb-2 text-accent">Catalogue</p>
                    <h1 className="text-3xl font-semibold sm:text-4xl">Products</h1>
                </div>

                <p className="text-sm text-muted">
                    {products.length} products available
                </p>
            </header>

            <ProductGrid products={products} />
        </div>
    );
}
