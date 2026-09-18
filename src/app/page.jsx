import Link from "next/link";

export default function Home() {
    return (
        <section className="shell flex flex-col items-start gap-6 py-20 sm:py-28">
            <p className="eyebrow rounded-full bg-accent-soft px-3 py-1 text-accent">
                React → Next.js
            </p>

            <h1 className="max-w-3xl text-4xl leading-[1.05] font-semibold sm:text-6xl">
                A small storefront, built the Next.js way.
            </h1>

            <p className="max-w-xl text-lg leading-relaxed text-balance">
                Browse the catalogue, open a product, and add it to your cart.
                Server components fetch the data, a client store keeps the cart.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                    href="/products"
                    className="rounded-full bg-accent px-6 py-3.5 font-semibold text-accent-contrast transition duration-200 hover:-translate-y-px hover:bg-accent-hover hover:shadow-card"
                >
                    Go to Product List
                </Link>
            </div>
        </section>
    );
}
