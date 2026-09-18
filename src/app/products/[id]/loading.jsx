export default function ProductDetailLoading() {
    return (
        <div className="shell py-8 pb-20 sm:py-12">
            <div className="mb-8 h-4 w-56 animate-pulse rounded-full bg-surface-alt sm:mb-10" />

            <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-20">
                <div className="aspect-square w-full animate-pulse rounded-[18px] border border-subtle bg-surface-alt" />

                <div className="flex max-w-xl flex-col gap-4">
                    <div className="h-4 w-28 animate-pulse rounded-full bg-surface-alt" />
                    <div className="h-12 w-full animate-pulse rounded-lg bg-surface-alt" />
                    <div className="h-12 w-3/4 animate-pulse rounded-lg bg-surface-alt" />
                    <div className="h-8 w-32 animate-pulse rounded-lg bg-surface-alt" />
                    <div className="h-28 w-full animate-pulse rounded-lg bg-surface-alt" />
                    <div className="h-14 w-48 animate-pulse rounded-full bg-surface-alt" />
                </div>
            </div>
        </div>
    );
}
