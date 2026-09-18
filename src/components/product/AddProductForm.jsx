"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { addProduct } from "@/lib/actions";

const INPUT_CLASSES =
    "w-full rounded-xl border border-subtle bg-background px-4 py-3 text-heading transition-colors placeholder:text-muted hover:border-strong focus:border-accent aria-invalid:border-danger";

function Field({ id, label, error, children }) {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={id} className="text-sm font-medium text-heading">
                {label}
            </label>

            {children}

            {error && (
                <p id={`${id}-error`} role="alert" className="text-sm text-danger">
                    {error.message}
                </p>
            )}
        </div>
    );
}

function AddProductForm() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();
    const [status, setStatus] = useState(null);

    async function onSubmit(data) {
        setStatus(null);

        try {
            const result = await addProduct(data);
            setStatus({
                type: "success",
                message: `Added "${data.productName}" (id ${result.id}).`,
            });
            reset();
        } catch {
            setStatus({
                type: "error",
                message: "Could not add the product. Please try again.",
            });
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex w-full max-w-lg flex-col gap-5 rounded-2xl border border-subtle bg-surface p-6 shadow-card sm:p-8"
        >
            <Field id="productName" label="Product Name" error={errors.productName}>
                <input
                    id="productName"
                    className={INPUT_CLASSES}
                    placeholder="Fjallraven Foldsack No. 1"
                    aria-invalid={errors.productName ? "true" : "false"}
                    aria-describedby={
                        errors.productName ? "productName-error" : undefined
                    }
                    {...register("productName", {
                        required: "Product Name is required",
                    })}
                />
            </Field>

            <Field id="price" label="Price" error={errors.price}>
                <input
                    id="price"
                    type="number"
                    step="0.01"
                    className={INPUT_CLASSES}
                    placeholder="109.95"
                    aria-invalid={errors.price ? "true" : "false"}
                    aria-describedby={errors.price ? "price-error" : undefined}
                    {...register("price", {
                        required: "Price is required",
                        min: { value: 0, message: "Price must be greater than 0" },
                        valueAsNumber: true,
                    })}
                />
            </Field>

            <Field id="category" label="Category" error={errors.category}>
                <input
                    id="category"
                    className={INPUT_CLASSES}
                    placeholder="men's clothing"
                    aria-invalid={errors.category ? "true" : "false"}
                    aria-describedby={errors.category ? "category-error" : undefined}
                    {...register("category", { required: "Category is required" })}
                />
            </Field>

            <button
                type="submit"
                disabled={isSubmitting}
                className="mt-1 cursor-pointer rounded-full bg-accent px-6 py-3.5 font-semibold text-accent-contrast transition duration-200 enabled:hover:-translate-y-px enabled:hover:bg-accent-hover enabled:hover:shadow-card disabled:cursor-not-allowed disabled:opacity-60"
            >
                {isSubmitting ? "Adding…" : "Add Product"}
            </button>

            {status && (
                <p
                    role="status"
                    className={`rounded-xl px-4 py-3 text-sm ${
                        status.type === "success"
                            ? "bg-accent-soft text-accent"
                            : "bg-surface-alt text-danger"
                    }`}
                >
                    {status.message}
                </p>
            )}
        </form>
    );
}

export default AddProductForm;
