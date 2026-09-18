import Link from "next/link";

import AddProductForm from "@/components/product/AddProductForm";

export const metadata = {
    title: "Add Product · React Store",
};

export default function AddProductPage() {
    return (
        <section className="shell flex flex-col items-start gap-8 py-12 sm:py-16">
            <header>
                <p className="eyebrow mb-2 text-accent">Catalogue</p>
                <h1 className="text-3xl font-semibold sm:text-4xl">Add a product</h1>
                <p className="mt-3 max-w-lg leading-relaxed">
                    Submissions go to the public Fake Store API, which echoes the
                    product back without saving it.
                </p>
            </header>

            <AddProductForm />

            <Link
                href="/products"
                className="rounded-full border border-strong px-6 py-3.5 font-semibold text-heading transition-colors hover:bg-surface-alt"
            >
                Back to products
            </Link>
        </section>
    );
}
