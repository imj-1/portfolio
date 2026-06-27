"use client";

import {useScrollAnimation} from "@/hooks/useScrollAnimation";

interface Project {
    title: string;
    description: string;
    tags: string[];
    icon: string;
    color: string;
}

const projects: Project[] = [
    {
        title: "Nexus Banking",
        description: "Nexus Banking is a banking platform built on a microservices architecture. The backend consists of independent Spring Boot services (api-gateway, user-service, account-service, transaction-service) communicating via REST and Kafka events, with Keycloak handling authentication, Redis for caching, and PostgreSQL for persistence.",
        tags: ["React", "D3.js", "WebSocket"],
        icon: "📊",
        color: "rgba(124, 109, 240, 0.1)",
    },
    {
        title: "Tankmates",
        description: "E-Commerce platform for aquatic animals.",
        tags: ["TypeScript", "Node.js", "React"],
        icon: "⌨️",
        color: "rgba(80, 200, 180, 0.1)",
    },
];

export default function Projects() {
    // The ref targets the grid container; stagger animates each card
    const gridRef = useScrollAnimation<HTMLDivElement>({stagger: 0.12, y: 30});

    return (
        <section id="projects" className="max-w-5xl mx-auto px-8 py-24">
            <p className="text-[11px] uppercase tracking-[0.15em] text-accent-purple/70 mb-4">
                Selected work
            </p>
            <h2 className="text-2xl font-medium tracking-tight mb-10">Projects</h2>

            <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((project) => (
                    <article
                        key={project.title}
                        className="group bg-bg-card border border-border-subtle rounded-xl p-6
              hover:border-border-hover hover:bg-[rgba(124,109,240,0.03)]
              transition-all duration-300 cursor-pointer hover:-translate-y-0.5"
                    >
                        {/* Icon */}
                        <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center text-lg mb-4"
                            style={{background: project.color}}
                        >
                            {project.icon}
                        </div>

                        {/* Content */}
                        <h3 className="text-[15px] font-medium mb-2">{project.title}</h3>
                        <p className="text-sm text-text-secondary leading-relaxed mb-3">
                            {project.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="text-[10px] px-2 py-1 rounded bg-[rgba(255,255,255,0.05)]
                    text-text-muted"
                                >
                  {tag}
                </span>
                            ))}
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}