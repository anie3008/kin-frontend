
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function Navbar() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Events", href: "/events" },
        { name: "About", href: "/about" },
    ];

    return (
        <header className="sticky top-0 z-50 border-b border-(--border) bg(--surface)">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

                {/* Logo */}
                <Link href="/" className="text-2xl font-bold tracking-tight text-[#a37803]">
                    kin<span className="text-[#466060]">.</span>
                </Link>

                {/* Desktop navigation */}
                <div className="hidden items-center gap-8 md:flex">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`text-sm font-medium transition-colors hover:text-(--primary) ${pathname === link.href
                                ? "text-(--primary)"
                                : "text-(--muted)"
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Desktop actions */}
                <div className="hidden items-center gap-3 md:flex">

                    <button
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                        className="rounded-lg p-2 text-foreground hover:bg-background)"
                    >
                        {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
                    </button>

                    <Link
                        href="/login"
                        className="rounded-lg px-4 py-2 text-sm font-medium text-foreground transition hover:bg-background"
                    >
                        Login
                    </Link>

                    <Link
                        href="/register"
                        className="rounded-lg bg-(--primary) px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#174F4B]"
                    >
                        Get Started
                    </Link>
                </div>

                {/* Mobile menu button */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="rounded-lg p-2 text-foreground md:hidden"
                    aria-label="Toggle navigation menu"
                    aria-expanded={isMenuOpen}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </nav>

            {/* Mobile navigation */}
            {isMenuOpen && (
                <div className="border-t border-(--border) bg-(--surface) px-6 py-4 md:hidden">
                    <div className="flex flex-col gap-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className={`text-sm font-medium ${pathname === link.href
                                    ? "text-primary"
                                    : "text-muted"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}

                        <div className="flex gap-3 border-t border-(--border)pt-4">

                            <button
                                onClick={toggleTheme}
                                aria-label="Toggle theme"
                                className="rounded-lg p-2 text-foreground hover:bg-background)"
                            >
                                {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
                            </button>

                            <Link
                                href="/login"
                                onClick={() => setIsMenuOpen(false)}
                                className="flex-1 rounded-lg border border-(--border) py-2 text-center text-sm"
                            >
                                Login
                            </Link>

                            <Link
                                href="/register"
                                onClick={() => setIsMenuOpen(false)}
                                className="flex-1 rounded-lg bg-(--primary) py-2 text-center text-sm text-white"
                            >
                                Get Started
                            </Link>

                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
