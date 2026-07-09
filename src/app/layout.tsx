import type {Metadata} from "next";
import {Dancing_Script, Inter} from "next/font/google";
import "./globals.css";
import type {ReactNode} from "react";
import Navbar from "@/components/Navbar";
import {ThemeScript} from "@/app/ThemeScript";

const inter = Inter({subsets: ["latin"], variable: "--font-sans"});
const dancingScript = Dancing_Script({
                                       subsets: ["latin"],
                                       variable: "--font-dancing-script",
                                     });

export const metadata: Metadata = {
  title: "Isidro Molina — Software Engineer Portfolio",
  description:
    "Portfolio of Isidro Molina, a software engineer building modern, fast, accessible interfaces.",
};

export default function RootLayout({children}: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning
          className={`${inter.variable} ${dancingScript.variable}`}>
    <body>
    <ThemeScript/>
    <Navbar/>
    {children}
    </body>
    </html>
  );
}