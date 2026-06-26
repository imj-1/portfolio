import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import React from "react";

const inter = Inter({subsets: ["latin"], variable: "--font-sans"});

export const metadata: Metadata = {
    title: "Isidro Molina — Software Engineer Portfolio",
    description: "Portfolio of Isidro Molina, a software engineer building modern fast, accessible interfaces.",
};

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en" className={inter.variable}>
        <body>
        <Navbar/>
        <main className="pt-15">{children}</main>
        </body>
        </html>
    );
}