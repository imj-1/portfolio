"use client";

import {useState} from "react";
import {useScrollAnimation} from "@/hooks/useScrollAnimation";
import {
  SiDocker,
  SiExpress,
  SiFigma,
  SiFirebase,
  SiGit,
  SiGo,
  SiGraphql,
  SiJavascript,
  SiKubernetes,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiRedis,
  SiRubyonrails,
  SiSnowflake,
  SiSpring,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVite,
} from "react-icons/si";
import type {IconType} from "react-icons";
import {FaAws} from "react-icons/fa";
import Image from "next/image";

interface Skill {
  name: string;
  icon: IconType | string;
  color: string;
}

const SKILL_CATALOG: Record<string, Skill> = {
  typescript: {name: "TypeScript", icon: SiTypescript, color: "#3178c6"},
  react: {name: "React", icon: SiReact, color: "#61dafb"},
  nextjs: {name: "Next.js", icon: SiNextdotjs, color: "#ffffff"},
  nodejs: {name: "Node.js", icon: SiNodedotjs, color: "#5fa04e"},
  go: {name: "Go", icon: SiGo, color: "#00add8"},
  postgresql: {name: "PostgreSQL", icon: SiPostgresql, color: "#4169e1"},
  aws: {name: "AWS", icon: FaAws, color: "#ff9900"},
  docker: {name: "Docker", icon: SiDocker, color: "#2496ed"},
  tailwind: {name: "Tailwind", icon: SiTailwindcss, color: "#06b6d4"},
  git: {name: "Git", icon: SiGit, color: "#f05032"},
  graphql: {name: "GraphQL", icon: SiGraphql, color: "#e10098"},
  figma: {name: "Figma", icon: SiFigma, color: "#f24e1e"},
  python: {name: "Python", icon: "/python-svgrepo-com.svg", color: "#3776ab"},
  kubernetes: {name: "Kubernetes", icon: SiKubernetes, color: "#326ce5"},
  redis: {name: "Redis", icon: SiRedis, color: "#ff4438"},
  firebase: {name: "Firebase", icon: SiFirebase, color: "#dd2c00"},
  vercel: {name: "Vercel", icon: SiVercel, color: "#ffffff"},
  vite: {name: "Vite", icon: SiVite, color: "#646cff"},
  rubyonrails: {name: "Ruby on Rails", icon: SiRubyonrails, color: "#cc0000"},
  springboot: {name: "Spring Boot", icon: SiSpring, color: "#6db33f"},
  java: {name: "Java", icon: "/java-svgrepo-com.svg", color: "#007396"},
  snowflake: {name: "Snowflake", icon: SiSnowflake, color: "#249edc"},
  express: {name: "Express", icon: SiExpress, color: "#ffffff"},
  javascript: {name: "JavaScript", icon: SiJavascript, color: "#F0DB4F"}
};


const DEFAULT_SKILLS = [
  "rubyonrails",
  "springboot",
  "express",
  "docker",
  "graphql",
  "postgresql",
  "redis",
  "nodejs",
  "typescript",
  "javascript",
  "java",
  "react",
  "nextjs",
  "python",
  "git",
  "figma"
];

export default function Skills() {
  const [activeKeys, setActiveKeys] = useState<string[]>(DEFAULT_SKILLS);
  const gridRef = useScrollAnimation<HTMLDivElement>({stagger: 0.06, y: 20});

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

          // Rename to asset to avoid treating a string like a React Component immediately
          const iconAsset = skill.icon;

          return (
            <div
              key={key}
              className="relative group flex flex-col items-center justify-center gap-2
            p-2 rounded-xl border border-border-subtle bg-bg-card
            hover:border-border-hover transition-all duration-300 cursor-pointer"
            >
              {/* Check type BEFORE rendering */}
              {typeof iconAsset === "string" ? (
                <Image
                  src={iconAsset}
                  alt={skill.name}
                  width={24}
                  height={24}
                  className="object-contain h-6 w-6"
                />
              ) : (
                 /* Capitalize it here locally now that we know it's a valid component */
                 (() => {
                   const IconComponent = iconAsset;
                   return (
                     <IconComponent
                       size={24}
                       style={{color: skill.color}}
                       className="text-text-muted transition-colors duration-300"
                     />
                   );
                 })()
               )}

              <span className="text-[11px] group-hover:text-text-secondary transition-colors">
                {skill.name}
            </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}