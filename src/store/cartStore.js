import { create } from "zustand";
import { persist } from "zustand/middleware";
const useCartStore = create(
    persist(
        (set) => ({
            cart: [],
            addToCart: (product) =>
                set((state) => ({ cart: [...state.cart, product] })),
        }),
        {
            name: "cart-storage", // unique name for localStorage
        }
    )
);

export default useCartStore;