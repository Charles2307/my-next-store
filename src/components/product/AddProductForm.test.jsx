// AddProductForm.test.jsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import AddProductForm from "./AddProductForm";
import { addProduct } from "@/lib/actions";

// Replace the real addProduct with a fake, controllable version
vi.mock("@/lib/actions", () => ({
    addProduct: vi.fn(),
}));

beforeEach(() => {
    vi.clearAllMocks(); // reset the mock's call history before each test
});

describe("AddProductForm", () => {
    it("shows validation errors when submitted empty", async () => {
        const user = userEvent.setup();
        render(<AddProductForm />);

        const submitButton = screen.getByRole("button", { name: /add product/i });
        await user.click(submitButton);

        expect(await screen.findByText(/product name is required/i)).toBeInTheDocument();
        expect(await screen.findByText(/price is required/i)).toBeInTheDocument();
        expect(await screen.findByText(/category is required/i)).toBeInTheDocument();

        // addProduct should NOT have been called, since validation failed
        expect(addProduct).not.toHaveBeenCalled();
    });

it("calls addProduct with form data on valid submit", async () => {
    addProduct.mockResolvedValue({ id: 1, productName: "Hand Bag" });
    const user = userEvent.setup();
    render(<AddProductForm />);

    const productNameInput = screen.getByLabelText(/product name/i);
    const priceInput = screen.getByLabelText(/price/i);
    const categoryInput = screen.getByLabelText(/category/i);

    await user.type(productNameInput, "Hand Bag");
    await user.type(priceInput, "10.99");
    await user.type(categoryInput, "Bag");

    const submitButton = screen.getByRole("button", { name: /add product/i });
    await user.click(submitButton);

    expect(addProduct).toHaveBeenCalledWith({
        productName: "Hand Bag",
        price: 10.99,
        category: "Bag",
    });
});
});