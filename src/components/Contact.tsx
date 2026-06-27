"use client";

import {useScrollAnimation} from "@/hooks/useScrollAnimation";

const links = [
    {label: "Email", href: "mailto:isidromolina.322@gmail.com", icon: "✉️"},
    {label: "GitHub", href: "https://github.com/imj-1", icon: "🐙"},
    {label: "LinkedIn", href: "https://www.linkedin.com/in/isidromolina/", icon: "💼"},
];

export default function Contact() {
    const ref = useScrollAnimation<HTMLDivElement>({y: 20});

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
                    {links.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-5 py-2.5 rounded-lg text-sm text-text-secondary
                border border-border-subtle hover:border-border-hover
                hover:text-text-primary transition-all duration-300"
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