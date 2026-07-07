"use client";

import {useEffect, useState, useSyncExternalStore} from "react";

const navLinks = [
  {label: "Work", href: "#projects"},
  {label: "About", href: "#about"},
  {label: "Contact", href: "#contact"},
];

type Theme = "dark" | "light";

/* --- theme store (module scope so refs are stable) --- */

const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener("storage", callback); // sync across tabs
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot(): Theme {
  return (document.documentElement.dataset.theme as Theme) || "dark";
}

function getServerSnapshot(): Theme {
  return "dark";
}

function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem("theme", theme);
  } catch {}
  listeners.forEach((l) => l());
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between
        px-4 sm:px-8 py-4 border-b transition-all duration-300
        ${scrolled
          ? "bg-bg-nav backdrop-blur-xl border-border-subtle shadow-(--shadow-nav)"
          : "border-transparent"
      }`}
    >
      <a href="#" className="text-[15px] font-medium tracking-tight text-text-primary">
        isidro<span className="text-accent-purple">.</span>molina
      </a>

      {/* Desktop links */}
      <div className="hidden sm:flex items-center gap-6">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-xs uppercase tracking-widest text-text-secondary hover:text-text-primary transition-colors duration-200 font-bold"
          >
            {link.label}
          </a>
        ))}
        <ThemeToggle theme={theme} onToggle={toggleTheme}/>
      </div>

      {/* Mobile controls */}
      <div className="flex items-center gap-2 sm:hidden">
        <ThemeToggle theme={theme} onToggle={toggleTheme}/>
        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          className="grid h-9 w-9 place-items-center rounded-full border border-border-subtle text-text-secondary hover:text-text-primary transition-colors"
        >
          {menuOpen ? <CloseIcon/> : <MenuIcon/>}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          className="absolute top-full left-0 right-0 sm:hidden flex flex-col border-b border-border-subtle bg-bg-nav backdrop-blur-xl px-4 py-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-xs uppercase tracking-widest text-text-secondary hover:text-text-primary transition-colors duration-200 font-bold py-3"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4"/>
      <path
        d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

function ThemeToggle({theme, onToggle}: { theme: Theme; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label="Toggle color theme"
      className="grid h-9 w-9 place-items-center rounded-full border border-border-subtle text-text-secondary hover:text-text-primary hover:bg-bg-card-hover hover:border-border-hover transition-colors duration-200 cursor-pointer"
    >
      {theme === "dark" ? <SunIcon/> : <MoonIcon/>}
    </button>
  );
}

function MenuIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
         strokeLinecap="round">
      <path d="M4 6h16M4 12h16M4 18h16"/>
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
         strokeLinecap="round">
      <path d="M18 6L6 18M6 6l12 12"/>
    </svg>
  );
}