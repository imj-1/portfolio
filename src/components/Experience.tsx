"use client";

import {useScrollAnimation} from "@/hooks/useScrollAnimation";

interface Role {
    title: string;
    company: string;
    period: string;
    color: string;
}

const roles: Role[] = [
    {title: "Software Developer", company: "Freelance", period: "2025 - Present", color: "#7c6df0"},
    {title: "Software Developer I", company: "Spring Health", period: "2023 – 2025", color: "#7c6df0"},
];

const skills = [
    "TypeScript",
    "React",
    "Next.js",
    "Ruby on Rails",
    "Node.js",
    "GraphQL",
    "PostgreSQL",
    "JavaScript",
    "Docker",
    "DataDog",
    "Mixpanel",
    "Redis",
    "Sentry",
    "Jira",
    "GitHub",
    "Figma",
    "SCSS",
];

export default function Experience() {
    const listRef = useScrollAnimation<HTMLDivElement>({stagger: 0.15, y: 20});
    const skillsRef = useScrollAnimation<HTMLDivElement>({stagger: 0.05, y: 10, delay: 0.3});

    return (
        <section id="about" className="max-w-5xl mx-auto px-8 py-24">
            <p className="text-[11px] uppercase tracking-[0.15em] text-accent-purple/70 mb-4">
                Background
            </p>
            <h2 className="text-2xl font-medium tracking-tight mb-10">Experience</h2>

            {/* Timeline */}
            <div ref={listRef} className="flex flex-col gap-6 mb-10">
                {roles.map((role) => (
                    <div key={role.company} className="flex gap-4 items-start">
                        <div
                            className="w-2 h-2 rounded-full mt-1.75 shrink-0"
                            style={{background: role.color}}
                        />
                        <div>
                            <h3 className="text-[14px] font-medium">{role.title}</h3>
                            <p className="text-[13px] text-accent-purple/70">{role.company}</p>
                            <p className="text-[11px] text-text-secondary mt-0.5">{role.period}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Skills */}
            <div ref={skillsRef} className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                    <span
                        key={skill}
                        className="px-3 py-1.5 rounded-md text-[12px] text-text-secondary
              border border-border-subtle bg-[rgba(255,255,255,0.02)]"
                    >
            {skill}
          </span>
                ))}
            </div>
        </section>
    );
}