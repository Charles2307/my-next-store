"use client";

import useCartStore from "@/store/cartStore";

function CartIcon() {
    const cart = useCartStore((state) => state.cart);
    const count = cart.length;

    return (
        <div
            className="inline-flex items-center gap-2 rounded-full border border-subtle bg-surface px-3 py-2 text-[15px] whitespace-nowrap text-heading shadow-card"
            aria-label={`Cart: ${count} item${count === 1 ? "" : "s"}`}
        >
            <svg
                className="size-[18px]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
            >
                <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6" />
                <circle cx="10" cy="20" r="1.2" />
                <circle cx="18" cy="20" r="1.2" />
            </svg>

            <span className="hidden sm:inline">Cart</span>

            <span className="min-w-[22px] rounded-full bg-accent px-1.5 text-center text-[13px] leading-5 font-semibold text-accent-contrast">
                {count}
            </span>
        </div>
    );
}

export default CartIcon;
