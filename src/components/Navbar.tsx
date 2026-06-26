"use client";

import {useEffect, useState} from "react";

const navLinks = [
    {label: "Work", href: "#projects"},
    {label: "About", href: "#about"},
    {label: "Contact", href: "#contact"},
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between
        px-8 py-4 transition-all duration-300
        ${scrolled
                ? "bg-[rgba(10,10,15,0.92)] backdrop-blur-xl border-b border-border-subtle"
                : "bg-transparent"
            }`}
        >
            <a href="#" className="text-[15px] font-medium tracking-tight text-text-primary">
                isidro<span className="text-accent-purple">.</span>molina
            </a>

            <div className="flex gap-6">
                {navLinks.map((link) => (
                    <a
                        key={link.href}
                        href={link.href}
                        className="text-xs uppercase tracking-widest text-text-secondary
              hover:text-text-primary transition-colors duration-300"
                    >
                        {link.label}
                    </a>
                ))}
            </div>
        </nav>
    );
}