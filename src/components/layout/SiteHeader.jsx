import Link from "next/link";

import CartIcon from "@/components/cart/CartIcon";

const NAV_LINKS = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/add-product", label: "Add Product" },
];

function SiteHeader() {
    return (
        <header className="sticky top-0 z-10 border-b border-subtle bg-background/80 backdrop-blur-md">
            <nav className="shell flex h-16 items-center justify-between gap-4">
                <div className="flex items-center gap-6">
                    <Link
                        href="/"
                        className="text-[17px] font-semibold tracking-tight text-heading"
                    >
                        React<span className="text-accent">Store</span>
                    </Link>

                    <div className="flex items-center gap-1">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="rounded-full px-3 py-1.5 text-sm font-medium text-muted transition-colors hover:bg-surface-alt hover:text-heading"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>

                <CartIcon />
            </nav>
        </header>
    );
}

export default SiteHeader;
