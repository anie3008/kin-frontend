
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { theme, toggleTheme } = useTheme();
    const { data: session, isPending } = authClient.useSession();

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Events", href: "/events" },
        { name: "Create Event", href: "/create-event" },
        { name: "Joined Events", href: "/joined-events" },
        { name: "Manage Events", href: "/manage-events" },
    ];

    const handleLogout = async () => {
        await authClient.signOut();
        setIsMenuOpen(false);
    };

    return (
        <header className="sticky top-0 z-50 border-b border-(--border) bg-(--surface)">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

                {/* Logo */}
                <Link
                    href="/"
                    className="text-2xl font-bold tracking-tight text-[#a37803]"
                >
                    kin<span className="text-[#466060]">.</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-8 md:flex">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`text-sm font-medium transition-colors hover:text-(--primary) ${
                                pathname === link.href
                                    ? "text-(--primary)"
                                    : "text-(--muted)"
                            }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Desktop Actions */}
                <div className="hidden items-center gap-4 md:flex">

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                        className="rounded-lg p-2 hover:bg-background"
                    >
                        {theme === "light" ? (
                            <Moon size={20} />
                        ) : (
                            <Sun size={20} />
                        )}
                    </button>

                    {/* Authentication */}
                    {isPending ? (
                        <p>Loading...</p>
                    ) : session?.user ? (
                        <div className="flex items-center gap-4">
                            <div className="relative group flex items-center gap-3">
                                {session.user.image ? (
                                    <Image
                                        src={session.user.image}
                                        alt={session.user.name || "Profile"}
                                        width={40}
                                        height={40}
                                        unoptimized
                                        className="h-10 w-10 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#466060] font-semibold text-white">
                                        {session.user.name?.charAt(0).toUpperCase() || "U"}
                                    </div>
                                )}

                                <div  className="absolute right-0 top-full z-50 mt-2 hidden w-56 rounded-lg border border-gray-100 bg-white p-3 shadow-lg group-hover:block">
                                    <p className="text-sm font-semibold">
                                        {session.user.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {session.user.email}
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={handleLogout}
                                className="rounded-lg bg-[#466060] px-4 py-2 text-white hover:bg-[#354c4c]"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link href="/login">Sign In</Link>

                            <Link
                                href="/register"
                                className="rounded-lg bg-[#466060] px-4 py-2 text-white"
                            >
                                Register
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden"
                    aria-label="Toggle navigation menu"
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

            </nav>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="border-t border-(--border) px-6 py-5 md:hidden">

                    {/* Mobile Navigation Links */}
                    <div className="flex flex-col gap-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className={`text-sm font-medium ${
                                    pathname === link.href
                                        ? "text-(--primary)"
                                        : "text-(--muted)"
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Actions */}
                    <div className="mt-5 flex flex-col gap-4 border-t border-(--border) pt-4">

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            aria-label="Toggle theme"
                            className="self-start rounded-lg p-2 hover:bg-background"
                        >
                            {theme === "light" ? (
                                <Moon size={20} />
                            ) : (
                                <Sun size={20} />
                            )}
                        </button>

                        {/* Mobile Authentication */}
                        {isPending ? (
                            <p className="text-sm">Loading...</p>
                        ) : session?.user ? (
                            <>
                                <div className="flex items-center gap-3">
                                    {session.user.image ? (
                                        <Image
                                            src={session.user.image}
                                            alt={session.user.name || "Profile"}
                                            width={40}
                                            height={40}
                                            unoptimized
                                            className="h-10 w-10 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#466060] font-semibold text-white">
                                            {session.user.name?.charAt(0).toUpperCase() || "U"}
                                        </div>
                                    )}

                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-semibold">
                                            {session.user.name}
                                        </p>
                                        <p className="truncate text-xs text-(--muted)">
                                            {session.user.email}
                                        </p>
                                    </div>
                                </div>

                                <button
                                    onClick={handleLogout}
                                    className="w-full rounded-lg bg-(--primary) py-2 text-sm text-white"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <div className="flex gap-3">
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
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
