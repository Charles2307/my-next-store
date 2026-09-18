import Link from "next/link";

import AddToCartButton from "@/components/product/AddToCartButton";
import { formatPrice } from "@/lib/format";
import { getProduct } from "@/lib/actions";

export const revalidate = 300;

export default async function ProductDetailPage({ params }) {
    const { id } = await params;
    const product = await getProduct(id);

    return (
        <div className="shell py-8 pb-20 sm:py-12">
            <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-[13px] tracking-wide text-muted capitalize sm:mb-10">
                <Link href="/" className="transition-colors hover:text-accent">Home</Link>
                <span aria-hidden="true">/</span>
                <Link href="/products" className="transition-colors hover:text-accent">Products</Link>
                <span aria-hidden="true">/</span>
                <span className="text-heading">{product.category}</span>
            </nav>

            <section className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-20">
                <div className="max-w-xl">
                    <p className="eyebrow mb-3.5 text-accent">{product.category}</p>
                    <h1 className="text-[clamp(2rem,4vw,3.375rem)] leading-[1.05] font-semibold">
                        {product.productName}
                    </h1>
                    <p className="mt-6 text-[28px] font-bold text-heading">
                        {formatPrice(product.price)}
                    </p>
                    <div className="my-7 h-[3px] w-14 bg-accent" />
                    <AddToCartButton
                        id={product.id}
                        productName={product.productName}
                        price={product.price}
                        className="pt-8"
                    />
                </div>
            </section>
        </div>
    );
}