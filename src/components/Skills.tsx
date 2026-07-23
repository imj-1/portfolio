"use client";

import {useScrollAnimation} from "@/hooks/useScrollAnimation";
import {
  SiAngular,
  SiDatadog,
  SiDocker,
  SiExpress,
  SiFigma,
  SiFirebase,
  SiGit,
  SiGo,
  SiGrafana,
  SiGraphql,
  SiJavascript,
  SiJest,
  SiKubernetes,
  SiMixpanel,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrometheus,
  SiReact,
  SiRedis,
  SiRedux,
  SiRubyonrails,
  SiSass,
  SiSentry,
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
  colorLight?: string;
}

const SKILL_CATALOG: Record<string, Skill> = {
  typescript: {name: "TypeScript", icon: SiTypescript, color: "#3178c6"},
  react: {name: "React", icon: SiReact, color: "#61dafb"},
  nextjs: {name: "Next.js", icon: SiNextdotjs, color: "#ffffff", colorLight: "#000000"},
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
  express: {name: "Express", icon: SiExpress, color: "#ffffff", colorLight: "#000000"},
  javascript: {name: "JavaScript", icon: SiJavascript, color: "#F0DB4F"},
  redux: {name: "Redux", icon: SiRedux, color: "#764abc"},
  springcloud: {name: "Spring Cloud", icon: SiSpring, color: "#6db33f"},
  jest: {name: "Jest", icon: SiJest, color: "#c21325"},
  datadog: {name: "Datadog", icon: SiDatadog, color: "#632ca6"},
  mixpanel: {name: "Mixpanel", icon: SiMixpanel, color: "#7856ff"},
  grafana: {name: "Grafana", icon: SiGrafana, color: "#f46800"},
  angular: {name: "Angular", icon: SiAngular, color: "#dd0031"},
  sass: {name: "Sass", icon: SiSass, color: "#cc6699"},
  nestjs: {name: "NestJS", icon: SiNestjs, color: "#e0234e"},
  prometheus: {name: "Prometheus", icon: SiPrometheus, color: "#e6522c"},
  sentry: {name: "Sentry", icon: SiSentry, color: "#9e86ff", colorLight: "#7c66c4"}
};

interface SkillGroup {
  label: string;
  keys: string[];
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    label: "Frontend",
    keys: ["typescript", "javascript", "nextjs", "react", "angular", "redux", "sass"],
  },
  {
    label: "Backend",
    keys: [
      "java",
      "python",
      "nodejs",
      "springboot",
      "rubyonrails",
      "express",
      "nestjs",
      "graphql",
      "postgresql",
      "redis",
    ],
  },
  {
    label: "Tools & Infrastructure",
    keys: ["docker", "jest", "git", "figma", "datadog", "mixpanel", "sentry", "grafana", "prometheus"],
  },
];

function SkillCard({skill}: { skill: Skill }) {
  const iconAsset = skill.icon;

  return (
    <div
      className="relative group flex flex-col items-center justify-center gap-1
        p-2 rounded-xl
        transition-all duration-300 cursor-pointer
        hover:-translate-y-1"
    >
      <div className="flex items-center justify-center h-12 w-12">
        {typeof iconAsset === "string" ? (
          <Image
            src={iconAsset}
            alt={skill.name}
            width={38}
            height={38}
            className="object-contain h-full w-full transition-transform duration-300
              group-hover:scale-125"
          />
        ) : (
           (() => {
             const IconComponent = iconAsset;
             return (
               <IconComponent
                 size={38}
                 style={{color: `light-dark(${skill.colorLight ?? skill.color}, ${skill.color})`}}
                 className="transition-transform duration-300 group-hover:scale-125"
               />
             );
           })()
         )}
      </div>

      <span className="text-[12px] text-text-secondary font-bold group-hover:text-text-primary transition-colors">
        {skill.name}
      </span>
    </div>
  );
}

function SkillCategory({group}: { group: SkillGroup }) {
  const gridRef = useScrollAnimation<HTMLDivElement>({
                                                       stagger: 0.03,
                                                       y: 20,
                                                       duration: 0.4,
                                                       ease: "power1.out",
                                                     });

  return (
    <div>
      <h3 className="text-[11px] uppercase tracking-[0.15em] text-text-secondary mb-4">
        {group.label}
      </h3>
      <div
        ref={gridRef}
        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-10 gap-2"
      >
        {group.keys.map((key) => {
          const skill = SKILL_CATALOG[key];
          if (!skill) return null;
          return <SkillCard key={key} skill={skill}/>;
        })}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="max-w-5xl mx-auto">
      <p className="text-[11px] uppercase tracking-[0.15em] text-accent-purple/70 mb-4">
        Technologies
      </p>
      <h2 className="text-2xl font-medium tracking-tight mb-8">Skills</h2>

      <div className="space-y-8">
        {SKILL_GROUPS.map((group) => (
          <SkillCategory key={group.label} group={group}/>
        ))}
      </div>
    </section>
  );
}