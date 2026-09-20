"use client";

import { useState, useMemo } from "react";
import ProductCard from "@/components/product/ProductCard";
import type { Product } from "@/generated/prisma/client";

type ProductGridProps = {
    products: Product[];
};

function ProductGrid({ products }: ProductGridProps) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredProducts = useMemo(() => {
        console.log("Filtering products..."); // watch this in your browser console
        return products.filter((p) =>
            p.productName.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [products, searchTerm]);

    return (
        <div>
            <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-6 rounded-lg border border-subtle px-4 py-2"
            />
            <ul className="grid list-none grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-6 p-0">
                {filteredProducts.map((product) => (
                    <li key={product.id}>
                        <ProductCard
                            id={product.id}
                            productName={product.productName}
                            price={product.price}
                            inStock={true}
                            category={product.category}
                            to={`/products/${product.id}`}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProductGrid;