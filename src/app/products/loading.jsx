export default function ProductsLoading() {
    return (
        <div className="shell py-12 sm:py-16">
            <header className="mb-10">
                <div className="mb-3 h-4 w-24 animate-pulse rounded-full bg-surface-alt" />
                <div className="h-9 w-48 animate-pulse rounded-lg bg-surface-alt" />
            </header>

            <ul className="grid list-none grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-6 p-0">
                {Array.from({ length: 8 }).map((_, index) => (
                    <li
                        key={index}
                        className="h-[26rem] animate-pulse rounded-2xl border border-subtle bg-surface-alt"
                    />
                ))}
            </ul>
        </div>
    );
}
