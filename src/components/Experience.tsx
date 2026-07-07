"use client";

import {useScrollAnimation} from "@/hooks/useScrollAnimation";

interface Role {
  title: string;
  company: string;
  period: string;
  color: string;
  skills: string[];
}

const roles: Role[] = [
  {
    title: "Software Developer",
    company: "Freelance",
    period: "2025 - Present",
    color: "#7c6df0",
    skills: [
      "Java",
      "Spring Boot",
      "Distributed Systems",
      "PostgreSQL",
      "Docker",
      "Redis",
      "Spring Cloud",
      "Oracle Cloud",
      "Angular",
      "Grafana",
      "Prometheus"
    ],
  },
  {
    title: "Software Developer I",
    company: "Spring Health",
    period: "2023 – 2025",
    color: "#7c6df0",
    skills: [
      "Ruby on Rails",
      "GraphQL",
      "PostgreSQL",
      "Docker",
      "Redis",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Datadog",
      "Mixpanel",
      "Sentry",
      "Jira",
      "GitHub",
      "Snowflake",
    ],
  },
];

export default function Experience() {
  const listRef = useScrollAnimation<HTMLDivElement>({
                                                       stagger: 0.03,
                                                       y: 20,
                                                       duration: 1.1,
                                                       ease: "power1.out",
                                                     });

  return (
    <section id="about" className="max-w-5xl mx-auto px-8 py-24">
      <p className="text-[11px] uppercase tracking-[0.15em] text-accent-purple/70 mb-4">
        Background
      </p>
      <h2 className="text-2xl font-medium tracking-tight mb-10">Experience</h2>

      {/* Timeline */}
      <div ref={listRef} className="flex flex-col gap-10">
        {roles.map((role) => (
          <div key={role.company} className="flex gap-4 items-start">
            <div
              className="w-2 h-2 rounded-full mt-1.75 shrink-0"
              style={{background: role.color}}
            />
            <div className="flex-1">
              <h3 className="text-[14px] font-medium">{role.title}</h3>
              <p className="text-[13px] text-accent-purple/70">{role.company}</p>
              <p className="text-[11px] text-text-secondary mt-0.5">{role.period}</p>

              {/* Per-role skills */}
              <div className="flex flex-wrap gap-2 mt-4">
                {role.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-md text-[12px] text-text-secondary
                      border border-border-subtle bg-[rgba(255,255,255,0.02)]"
                  >
                                        {skill}
                                    </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
