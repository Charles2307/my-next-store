"use client";

import useCartStore, { CartItem } from "@/store/cartStore";
import { useMemo } from "react";

const SIZES = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3.5 text-base",
};

type AddToCartButtonProps = {
    id: number;
    productName: string;
    price: number;
    inStock?: boolean;
    size?: "sm" | "md";
    className?: string;
};

function AddToCartButton({
    id,
    productName,
    price,
    inStock = true,
    size = "md",
    className = "",
}: AddToCartButtonProps) {
    const cart = useCartStore((state) => state.cart);
    const addToCart = useCartStore((state) => state.addToCart);
    const quantity = useMemo(() => {
        console.log("Recalculating quantity for", productName);
        return cart.filter((item) => item.id === Number(id)).length;
    }, [cart, id]);

    function handleAddToCart() {
        const item: CartItem = {
            id,
            productName,
            price,
        };
        addToCart(item);
    }

    return (
        <div className={`flex flex-wrap items-center gap-3 ${className}`}>
            <button
                type="button"
                onClick={handleAddToCart}
                disabled={!inStock}
                className={`${SIZES[size]} flex-auto cursor-pointer rounded-full border border-transparent bg-accent font-semibold text-accent-contrast transition duration-200 enabled:hover:-translate-y-px enabled:hover:bg-accent-hover enabled:hover:shadow-card enabled:active:translate-y-0 disabled:cursor-not-allowed disabled:border-subtle disabled:bg-surface-alt disabled:text-muted`}
            >
                {inStock ? "Add to Cart" : "Out of Stock"}
            </button>

            {quantity > 0 && (
                <span className="shrink-0 rounded-full bg-accent-soft px-3 py-1 text-sm font-medium whitespace-nowrap text-accent">
                    {quantity} in cart
                </span>
            )}
        </div>
    );
}

export default AddToCartButton;
