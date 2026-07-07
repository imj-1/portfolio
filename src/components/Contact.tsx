"use client";

import {SubmitEvent, useState} from "react";
import {useScrollAnimation} from "@/hooks/useScrollAnimation";

const EMAIL = ["isidromolina.322", "gmail.com"].join("@");

const links = [
  {label: "GitHub", href: "https://github.com/imj-1", icon: "🐙"},
  {label: "LinkedIn", href: "https://www.linkedin.com/in/isidromolina/", icon: "💼"},
];

type Status = "idle" | "submitting" | "success" | "error";

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

  const itemClass =
    "px-5 py-2.5 rounded-lg text-sm text-text-secondary border border-border-subtle " +
    "hover:border-border-hover hover:text-text-primary transition-all duration-300 cursor-pointer";

  const inputClass =
    "w-full px-4 py-2.5 rounded-lg bg-transparent text-sm text-text-primary " +
    "placeholder:text-text-secondary/60 border border-border-subtle " +
    "focus:border-border-hover focus:outline-none transition-all duration-300";

  return (
    <section
      id="contact"
      className="min-h-screen flex items-center justify-center px-8 text-center"
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

        <div className="flex justify-center gap-3 mt-4">
          <button type="button" onClick={copyEmail} aria-label={`Copy email address ${EMAIL}`} className={itemClass}>
            <span className="mr-1.5">✉️</span>
            {copied ? "Copied!" : "Copy email"}
          </button>
          {links.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className={itemClass}>
              <span className="mr-1.5">{link.icon}</span>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}