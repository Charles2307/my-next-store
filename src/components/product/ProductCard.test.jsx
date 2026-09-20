import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect, beforeEach } from "vitest"
import ProductCard from "./ProductCard"
import useCartStore from "@/store/cartStore";


beforeEach(() => {
    useCartStore.setState({ cart: [] }); // reset the store before each test
});

describe("ProductCard", () => {
    it("shows the product name and price", () => {
        render(
            <ProductCard
                id={1}
                productName="Test Backpack"
                price={49.99}
                inStock={true}
                to="/products/1"
            />
        );
        expect(screen.getByText("Test Backpack")).toBeInTheDocument();
        expect(screen.getByText("$49.99")).toBeInTheDocument();
    })

    it("disables the Add to cart button when out of stock", () => {
        render(
            <ProductCard
                id={1}
                productName="Test Backpack"
                price={49.99}
                inStock={false}
                to="/products/1"
            />
        );
        const button = screen.getByRole("button", {
            name: /out of stock/i
        });
        expect(button).toBeDisabled();
    })

    it("adds an item to the cart when clicked", async () => {
        const user = userEvent.setup();

        render(
            <ProductCard id={1}
                productName="Test Backpack"
                price={49.99}
                inStock={true}
                to="/products/1"
            />
        );

        const button = screen.getByRole("button", { name: /add to cart/i });
        await user.click(button);

        expect(screen.getByText(/1 in cart/i)).toBeInTheDocument();
    });

    it("instock/out of stock renders correctly based on the instock prop", () => {
        render(
            <div>
                <ProductCard
                    id={1}
                    productName="Test Backpack"
                    price={49.99}
                    inStock={true}
                    to="/products/1"
                />
                <ProductCard
                    id={1}
                    productName="Test Backpack"
                    price={49.99}
                    inStock={false}
                    to="/products/1"
                />
            </div>
        );
        expect(screen.getByText("In Stock", { selector: "p" }))
            .toBeInTheDocument();

        expect(screen.getByText("Out of Stock", { selector: "p" }))
            .toBeInTheDocument();
    })
})