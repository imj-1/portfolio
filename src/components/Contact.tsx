"use client";

import {useState} from "react";
import {useScrollAnimation} from "@/hooks/useScrollAnimation";

// Assembled at runtime so the address isn't a clean mailto: literal in the HTML
// for naive harvesters to scrape.
const EMAIL = ["isidromolina.322", "gmail.com"].join("@");

const links = [
    {label: "GitHub", href: "https://github.com/imj-1", icon: "🐙"},
    {label: "LinkedIn", href: "https://www.linkedin.com/in/isidromolina/", icon: "💼"},
];

export default function Contact() {
    const ref = useScrollAnimation<HTMLDivElement>({y: 20});
    const [copied, setCopied] = useState(false);

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(EMAIL);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            window.location.href = `mailto:${EMAIL}`; // fallback if clipboard is blocked
        }
    };

    const itemClass =
        "px-5 py-2.5 rounded-lg text-sm text-text-secondary border border-border-subtle " +
        "hover:border-border-hover hover:text-text-primary transition-all duration-300 cursor-pointer";

    return (
        <section
            id="contact"
            className="min-h-screen flex items-center justify-center px-8 text-center"
        >
            <div ref={ref}>
                <p className="text-[11px] uppercase tracking-[0.15em] text-accent-purple/70 mb-4">
                    Get in touch
                </p>
                <h2 className="text-2xl font-medium tracking-tight mb-3">
                    Let&apos;s build something
                </h2>
                <p className="text-sm text-text-secondary mb-8">
                    Currently open to full-time roles and interesting collaborations.
                </p>
                <div className="flex justify-center gap-3">
                    <button
                        type="button"
                        onClick={copyEmail}
                        aria-label={`Copy email address ${EMAIL}`}
                        className={itemClass}
                    >
                        <span className="mr-1.5">✉️</span>
                        {copied ? "Copied!" : "Copy email"}
                    </button>
                    {links.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={itemClass}
                        >
                            <span className="mr-1.5">{link.icon}</span>
                            {link.label}
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}