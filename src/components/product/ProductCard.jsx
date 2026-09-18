import Image from "next/image";
import Link from "next/link";

import AddToCartButton from "@/components/product/AddToCartButton";
import { formatPrice } from "@/lib/format";

function ProductCard({ id, productName, price, inStock, image, category, to }) {
    return (
        <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-subtle bg-surface shadow-card transition duration-200 hover:-translate-y-0.5 hover:border-accent-border hover:shadow-card-hover">
            <Link
                href={to}
                tabIndex={-1}
                aria-hidden="true"
                className="relative block h-56 overflow-hidden bg-white"
            >
                {image && (
                    <Image
                        src={image}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                        className="object-contain p-6 transition duration-300 group-hover:scale-[1.04]"
                    />
                )}
            </Link>

            <div className="flex flex-auto flex-col gap-2 p-5">
                {category && <p className="eyebrow text-muted">{category}</p>}

                <h3 className="text-base leading-snug font-semibold">
                    <Link
                        href={to}
                        className="text-heading no-underline transition-colors hover:text-accent"
                    >
                        <span className="line-clamp-2">{productName}</span>
                    </Link>
                </h3>

                <p className="mt-auto pt-2 text-xl font-semibold text-heading">
                    {formatPrice(price)}
                </p>

                <p
                    className={`flex items-center gap-1.5 text-sm ${
                        inStock ? "text-success" : "text-danger"
                    }`}
                >
                    <span
                        aria-hidden="true"
                        className="size-1.5 rounded-full bg-current"
                    />
                    {inStock ? "In Stock" : "Out of Stock"}
                </p>
            </div>

            <div className="border-t border-subtle p-5">
                <AddToCartButton
                    id={id}
                    productName={productName}
                    price={price}
                    inStock={inStock}
                    size="sm"
                />
            </div>
        </article>
    );
}

export default ProductCard;
