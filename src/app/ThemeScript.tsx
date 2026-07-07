"use client";

import {useServerInsertedHTML} from "next/navigation";

const themeInit = `
  (function () {
    try {
      const t = localStorage.getItem("theme") || "dark";
      document.documentElement.setAttribute("data-theme", t);
    } catch (_) {}
  })();
`;

export function ThemeScript() {
  useServerInsertedHTML(() => (
    <script dangerouslySetInnerHTML={{__html: themeInit}}/>
  ));
  return null;
}