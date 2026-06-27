"use client";

import {useEffect, useRef, useState} from "react";
import {useScrollAnimation} from "@/hooks/useScrollAnimation";
import {
    SiCloudflare,
    SiDocker,
    SiFigma,
    SiFirebase,
    SiGit,
    SiGo,
    SiGraphql,
    SiKubernetes,
    SiLinux,
    SiMongodb,
    SiNextdotjs,
    SiNodedotjs,
    SiPostgresql,
    SiPrisma,
    SiPython,
    SiReact,
    SiRedis,
    SiRubyonrails,
    SiRust,
    SiTailwindcss,
    SiThreedotjs,
    SiTypescript,
    SiVercel,
    SiVite
} from "react-icons/si";
import type {IconType} from "react-icons";
import {FaAws} from "react-icons/fa";

interface Skill {
    name: string;
    icon: IconType;
    color: string; // brand color for hover state
}

const SKILL_CATALOG: Record<string, Skill> = {
    typescript: {name: "TypeScript", icon: SiTypescript, color: "#3178c6"},
    react: {name: "React", icon: SiReact, color: "#61dafb"},
    nextjs: {name: "Next.js", icon: SiNextdotjs, color: "#ffffff"},
    threejs: {name: "Three.js", icon: SiThreedotjs, color: "#ffffff"},
    nodejs: {name: "Node.js", icon: SiNodedotjs, color: "#5fa04e"},
    go: {name: "Go", icon: SiGo, color: "#00add8"},
    postgresql: {name: "PostgreSQL", icon: SiPostgresql, color: "#4169e1"},
    aws: {name: "AWS", icon: FaAws, color: "#ff9900"},
    docker: {name: "Docker", icon: SiDocker, color: "#2496ed"},
    tailwind: {name: "Tailwind", icon: SiTailwindcss, color: "#06b6d4"},
    git: {name: "Git", icon: SiGit, color: "#f05032"},
    graphql: {name: "GraphQL", icon: SiGraphql, color: "#e10098"},
    figma: {name: "Figma", icon: SiFigma, color: "#f24e1e"},
    python: {name: "Python", icon: SiPython, color: "#3776ab"},
    rust: {name: "Rust", icon: SiRust, color: "#ffffff"},
    kubernetes: {name: "Kubernetes", icon: SiKubernetes, color: "#326ce5"},
    redis: {name: "Redis", icon: SiRedis, color: "#ff4438"},
    mongodb: {name: "MongoDB", icon: SiMongodb, color: "#47a248"},
    firebase: {name: "Firebase", icon: SiFirebase, color: "#dd2c00"},
    vercel: {name: "Vercel", icon: SiVercel, color: "#ffffff"},
    vite: {name: "Vite", icon: SiVite, color: "#646cff"},
    prisma: {name: "Prisma", icon: SiPrisma, color: "#2d3748"},
    linux: {name: "Linux", icon: SiLinux, color: "#fcc624"},
    cloudflare: {name: "Cloudflare", icon: SiCloudflare, color: "#f38020"},
    rubyonrails: {name: "Ruby on Rails", icon: SiRubyonrails, color: "#cc0000"},
    springboot: {name: "Spring Boot", icon: SiRubyonrails, color: "#6db33f"},
    springcloud: {name: "Spring Cloud", icon: SiRubyonrails, color: "#6db33f"},
    java: {name: "Java", icon: SiRubyonrails, color: "#f89820"},

};


const DEFAULT_SKILLS = [
    "typescript", "react", "nextjs", "threejs",
    "nodejs", "rubyonrails", "postgresql", "aws", "docker",
];

function AddSkillModal({
                           activeKeys,
                           onAdd,
                           onClose,
                       }: {
    activeKeys: string[];
    onAdd: (key: string) => void;
    onClose: () => void;
}) {
    const [search, setSearch] = useState("");
    const modalRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                onClose();
            }
        }

        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [onClose]);

    // Close on Escape
    useEffect(() => {
        function handleKey(e: KeyboardEvent) {
            if (e.key === "Escape") onClose();
        }

        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [onClose]);

    // Filter catalog to skills not already active, matching search
    const available = Object.entries(SKILL_CATALOG)
        .filter(([key]) => !activeKeys.includes(key))
        .filter(([, skill]) =>
            skill.name.toLowerCase().includes(search.toLowerCase())
        );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div
                ref={modalRef}
                className="w-full max-w-sm bg-[#12121a] border border-border-subtle
          rounded-xl p-5 shadow-2xl"
            >
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium">Add a skill</h3>
                    <button
                        onClick={onClose}
                        className="text-text-muted hover:text-text-primary transition-colors text-lg leading-none"
                    >
                        ×
                    </button>
                </div>

                <input
                    type="text"
                    placeholder="Search technologies..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    autoFocus
                    className="w-full px-3 py-2 rounded-lg bg-[rgba(255,255,255,0.05)]
            border border-border-subtle text-sm text-text-primary
            placeholder:text-text-muted outline-none
            focus:border-border-hover transition-colors mb-3"
                />

                <div className="max-h-56 overflow-y-auto flex flex-col gap-1">
                    {available.length === 0 ? (
                        <p className="text-xs text-text-muted text-center py-4">
                            {search ? "No matching skills found" : "All skills added!"}
                        </p>
                    ) : (
                        available.map(([key, skill]) => {
                            const Icon = skill.icon;
                            return (
                                <button
                                    key={key}
                                    onClick={() => {
                                        onAdd(key);
                                        onClose();
                                    }}
                                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-left
                    hover:bg-[rgba(255,255,255,0.05)] transition-colors group"
                                >
                                    <Icon
                                        size={24}
                                        style={{color: skill.color}}
                                        className="transition-colors duration-300"
                                    />
                                    <span
                                        className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                    {skill.name}
                  </span>
                                </button>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}

export default function Skills() {
    const [activeKeys, setActiveKeys] = useState<string[]>(DEFAULT_SKILLS);
    const [showModal, setShowModal] = useState(false);
    const gridRef = useScrollAnimation<HTMLDivElement>({stagger: 0.06, y: 20});

    function addSkill(key: string) {
        setActiveKeys((prev) => [...prev, key]);
    }

    function removeSkill(key: string) {
        setActiveKeys((prev) => prev.filter((k) => k !== key));
    }

    return (
        <section id="skills" className="max-w-5xl mx-auto px-8 py-24">
            <p className="text-[11px] uppercase tracking-[0.15em] text-accent-purple/70 mb-4">
                Technologies
            </p>
            <h2 className="text-2xl font-medium tracking-tight mb-10">Skills</h2>

            <div
                ref={gridRef}
                className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3"
            >
                {activeKeys.map((key) => {
                    const skill = SKILL_CATALOG[key];
                    if (!skill) return null;
                    const Icon = skill.icon;

                    return (
                        <div
                            key={key}
                            className="relative group flex flex-col items-center justify-center gap-2
                py-5 rounded-xl border border-border-subtle bg-bg-card
                hover:border-border-hover transition-all duration-300 cursor-default"
                        >
                            {/* Remove button — top right, visible on hover */}
                            <button
                                onClick={() => removeSkill(key)}
                                className="absolute top-1.5 right-2 text-text-muted opacity-0
                  group-hover:opacity-100 hover:text-red-400
                  transition-all text-xs leading-none"
                                aria-label={`Remove ${skill.name}`}
                            >
                                ×
                            </button>

                            <Icon
                                size={24}
                                style={{color: skill.color}}
                                className="text-text-muted transition-colors duration-300"
                            />
                            <span
                                className="text-[11px] text-text-muted group-hover:text-text-secondary transition-colors">
                {skill.name}
              </span>
                        </div>
                    );
                })}

                {/* Add button */}
                <button
                    onClick={() => setShowModal(true)}
                    className="flex flex-col items-center justify-center gap-2
            py-5 rounded-xl border border-dashed border-border-subtle
            hover:border-border-hover hover:bg-[rgba(124,109,240,0.03)]
            transition-all duration-300 cursor-pointer group"
                >
          <span className="text-xl text-text-muted group-hover:text-accent-purple transition-colors">
            +
          </span>
                    <span className="text-[11px] text-text-muted group-hover:text-text-secondary transition-colors">
            Add skill
          </span>
                </button>
            </div>

            {showModal && (
                <AddSkillModal
                    activeKeys={activeKeys}
                    onAdd={addSkill}
                    onClose={() => setShowModal(false)}
                />
            )}
        </section>
    );
}