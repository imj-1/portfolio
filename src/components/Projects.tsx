"use client";

import {useScrollAnimation} from "@/hooks/useScrollAnimation";
import Image from "next/image";

interface Project {
  title: string;
  description: string;
  tags: string[];
  icon: string;
  color: string;
  link?: string;
}

const projects: Project[] = [
  {
    title: "Nexus Banking",
    description: "Nexus Banking is a banking platform built on a microservices architecture. The backend consists of independent Spring Boot services (api-gateway, user-service, account-service, transaction-service) communicating via REST and Kafka events, with Keycloak handling authentication, Redis for caching, and PostgreSQL for persistence.",
    tags: ["Java", "Spring Boot", "Angular", "Spring Cloud", "Distributed Systems"],
    icon: "/nexus-logo.png",
    color: "rgba(124, 109, 240, 0.1)",
    link: "https://nexusbanking.netlify.app/",
  },
  {
    title: "Tankmates",
    description: "E-Commerce platform for aquatic animals.",
    tags: ["TypeScript", "Node.js", "React", "Express", "PostgreSQL", "SCSS"],
    icon: "/tankmates-icon.png",
    color: "rgba(80, 200, 180, 0.1)",
    link: "https://tankmates.netlify.app/",
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
        {projects.map((project) => {
          // Check if the icon points to an actual file extension
          const isImagePath = project.icon.match(/\.(jpeg|jpg|gif|png|svg)$/i);

          return (
            <a
              href={project.link || undefined}
              key={project.title}
              target="_blank"
              rel="noopener noreferrer"
              className="h-full"
            >
              <article
                className="group flex flex-col h-full bg-bg-card border border-border-subtle rounded-xl p-6
            hover:border-border-hover transition-all duration-300 cursor-pointer hover:-translate-y-0.5"
              >
                {/* Dynamic Icon Container */}
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-lg mb-4 relative overflow-hidden"
                  style={{background: project.color}}
                >
                  {isImagePath ? (
                    <Image
                      src={project.icon}
                      alt={`${project.title} logo`}
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  ) : (
                     // Fallback element for emojis or text
                     <span>{project.icon}</span>
                   )}
                </div>

                {/* Content */}
                <h3 className="text-[15px] font-medium mb-2">{project.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-3">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-auto pt-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-md text-[10px] text-text-secondary
              border border-border-subtle bg-[rgba(255,255,255,0.02)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </a>
          );
        })}
      </div>
    </section>
  );
}