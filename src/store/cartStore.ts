// store/cartStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
    id: number;
    productName: string;
    price: number;
}

interface CartState {
    cart: CartItem[];
    addToCart: (product: CartItem) => void;
}

const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            cart: [],
            addToCart: (product) =>
                set((state) => ({ cart: [...state.cart, product] })),
        }),
        { name: "cart-storage" }
    )
);

export default useCartStore;