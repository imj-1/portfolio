"use client";

import {SubmitEvent, useState} from "react";
import {useScrollAnimation} from "@/hooks/useScrollAnimation";
import {FaGithub, FaLinkedin} from "react-icons/fa";
import {FiCalendar, FiCheck} from "react-icons/fi";

const EMAIL = ["isidromolina.322", "gmail.com"].join("@");
const BOOKING_URL = "https://calendar.app.google/BSUs1LRSPyW5Aqc88";

const links = [
  {
    label: "Book Meeting",
    href: BOOKING_URL,
    icon: FiCalendar,
    color: "light-dark(#181717, #ffffff)",
  },
  {
    label: "GitHub",
    href: "https://github.com/imj-1",
    icon: FaGithub,
    color: "light-dark(#181717, #ffffff)",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/isidromolina/",
    icon: FaLinkedin,
    color: "#0a66c2",
  },
];

type Status = "idle" | "submitting" | "success" | "error";

function GmailIcon({size = 24}: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="52 42 88 66" aria-hidden="true">
      <path fill="#4285f4" d="M58 108h14V74L52 59v43c0 3.32 2.69 6 6 6"/>
      <path fill="#34a853" d="M120 108h14c3.32 0 6-2.69 6-6V59l-20 15"/>
      <path fill="#fbbc04" d="M120 48v26l20-15v-8c0-7.42-8.47-11.65-14.4-7.2"/>
      <path fill="#ea4335" d="M72 74V48l24 18 24-18v26L96 92"/>
      <path fill="#c5221f" d="M52 51v8l20 15V48l-5.6-4.2c-5.94-4.45-14.4-.22-14.4 7.2"/>
    </svg>
  );
}

export default function Contact() {
  const ref = useScrollAnimation<HTMLDivElement>({y: 20, duration: 1.1});
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("submitting");
    setError("");

    const fd = new FormData(form);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
                               name: fd.get("name"),
                               email: fd.get("email"),
                               message: fd.get("message"),
                               company: fd.get("company"), // honeypot
                             }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setStatus("error");
        setError(data.error || "Something went wrong.");
        return;
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  const circleClass =
    "flex items-center justify-center h-12 w-12 rounded-full " +
    "border border-border-subtle hover:border-border-hover " +
    "transition-all duration-300 cursor-pointer hover:-translate-y-0.5";

  const inputClass =
    "w-full px-4 py-2.5 rounded-lg bg-transparent text-sm sm:text-sm text-text-primary " +
    "placeholder:text-text-secondary/60 border border-border-subtle " +
    "focus:border-border-hover focus:outline-none transition-all duration-300";

  return (
    <section
      id="contact"
      className="min-h-svh flex items-center justify-center px-8 text-center"
    >
      <div ref={ref} className="w-full max-w-md">
        <h2 className="text-2xl font-medium tracking-tight mb-3">
          Let’s launch your next project! 🚀
        </h2>
        <p className="text-l font-bold uppercase tracking-[0.15em] text-accent-purple/70 mb-6">
          Get in touch!
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-left">
          {/* Honeypot — hidden from humans, tempting to bots */}
          <div className="absolute left-[-9999px]" aria-hidden="true">
            <label>
              Company
              <input name="company" tabIndex={-1} autoComplete="off"/>
            </label>
          </div>

          <input name="name" type="text" required placeholder="Your name" className={inputClass}/>
          <input name="email" type="email" required placeholder="Your email" className={inputClass}/>
          <textarea name="message" required rows={4} placeholder="Your pitch/feature request"
                    className={inputClass + " resize-none"}/>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="px-5 py-2.5 rounded-lg text-sm font-medium border border-accent-purple/50 text-accent-purple hover:bg-accent-purple/10 hover:border-accent-purple transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "submitting" ? "Sending…" : "Send message"}
          </button>

          <div aria-live="polite" className="min-h-5 text-sm">
            {status === "success" && (
              <span className="text-accent-purple/80">Thanks for reaching out, I look forward to connecting soon!</span>
            )}
            {status === "error" && <span className="text-red-400/80">{error}</span>}
          </div>
        </form>

        <div className="flex items-center gap-3 my-4" aria-hidden="true">
          <div className="h-px flex-1 bg-border-subtle"/>
          <span className="text-[11px] uppercase tracking-[0.15em] text-text-secondary">or</span>
          <div className="h-px flex-1 bg-border-subtle"/>
        </div>

        <div className="flex justify-center gap-3 mt-4">
          <button
            type="button"
            onClick={copyEmail}
            aria-label={copied ? "Email copied" : `Copy email address ${EMAIL}`}
            title={copied ? "Copied!" : "Copy email"}
            className={circleClass}
          >
            {copied ? (
              <FiCheck size={24} style={{color: "var(--color-accent-teal)"}}/>
            ) : (
               <GmailIcon size={24}/>
             )}
          </button>

          {links.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                title={link.label}
                className={circleClass}
              >
                <Icon size={24} style={{color: link.color}}/>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}