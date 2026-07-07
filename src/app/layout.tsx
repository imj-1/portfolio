import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import type {ReactNode} from "react";
import Navbar from "@/components/Navbar"; // adjust to your actual path

const inter = Inter({subsets: ["latin"], variable: "--font-sans"});

const themeInit = `(function(){try{const t=localStorage.getItem("theme");document.documentElement.dataset.theme=t||(window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark")}catch{document.documentElement.dataset.theme="dark"}})();`;

export const metadata: Metadata = {
  title: "Isidro Molina — Software Engineer Portfolio",
  description:
    "Portfolio of Isidro Molina, a software engineer building modern, fast, accessible interfaces.",
};

export default function RootLayout({children}: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning className={inter.variable}>
    <body>
    <script dangerouslySetInnerHTML={{__html: themeInit}}/>
    <Navbar/>
    {children}
    </body>
    </html>
  );
}