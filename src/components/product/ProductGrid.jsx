import ProductCard from "@/components/product/ProductCard";

function ProductGrid({ products }) {
    return (
        <ul className="grid list-none grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-6 p-0">
            {products.map((product) => (
                <li key={product.id}>
                    <ProductCard
                        id={product.id}
                        productName={product.productName}
                        price={product.price}
                        inStock={true}
                        image={product.image}
                        category={product.category}
                        to={`/products/${product.id}`}
                    />
                </li>
            ))}
        </ul>
    );
}

export default ProductGrid;
