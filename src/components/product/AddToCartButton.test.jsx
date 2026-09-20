import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect, beforeEach } from "vitest"
import useCartStore from "@/store/cartStore";
import AddToCartButton from "./AddToCartButton";

beforeEach(() => {
    useCartStore.setState({
        cart: []
    })
})

describe("AddToCartButton Component Test Suite", () => {

    it("Render Add to cart and enabled", () => {
        render(
            <AddToCartButton
                id={1}
                productName={"Hand Bag"}
                price={10.99}
                inStock={true}
            />
        );
        expect(screen.getByText('Add to Cart')).toBeInTheDocument();
        const button = screen.getByRole("button", {
            name: /add to cart/i
        });
        expect(button).toBeEnabled();

    })

    it("Render Out of Stock and disabled", () => {
        render(
            <AddToCartButton
                id={1}
                productName={"Hand Bag"}
                price={10.99}
                inStock={false}
            />
        );
        expect(screen.getByText('Out of Stock')).toBeInTheDocument();
        const button = screen.getByRole("button", {
            name: /out of stock/i
        });
        expect(button).toBeDisabled();
    })

    it("adds an item to the cart when clicked", async () => {
        const user = userEvent.setup();

        render(
            <AddToCartButton
                id={1}
                productName={"Hand Bag"}
                price={10.99}
                inStock={true}
            />
        );

        const button = screen.getByRole("button", { name: /add to cart/i });
        await user.click(button);

        expect(screen.getByText(/1 in cart/i)).toBeInTheDocument();
    });

    it("increments quantity on repeated clicks", async () => {
        const user = userEvent.setup();

        useCartStore.setState({
            cart: [
                { id: 2, productName: "Backpack", price: 20 },
                { id: 2, productName: "Backpack", price: 20 },
            ],
        });

        render(
            <AddToCartButton
                id={1}
                productName="Hand Bag"
                price={10.99}
                inStock={true}
            />
        );

        expect(screen.queryByText(/\d+ in cart/i)).not.toBeInTheDocument();

        const button = screen.getByRole("button", { name: /add to cart/i });

        for (let quantity = 1; quantity <= 3; quantity++) {
            await user.click(button);

            expect(screen.getByText(`${quantity} in cart`))
                .toBeInTheDocument();

            expect(
                useCartStore.getState().cart.filter((item) => item.id === 1).length
            ).toBe(quantity);
        }

        expect(useCartStore.getState().cart).toHaveLength(5);
    });
})