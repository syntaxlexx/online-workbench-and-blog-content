import React from "react";
import Providers from "@/components/Providers";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/ui/Toast";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="en"
            className={cn("bg-white text-slate-900 antialiased ", inter.className)}
        >
        <body className="min-h-screen bg-slate-50 dark:bg-slate-900 antialiased">
            <Providers>
                {children}

                <Toaster />

                {/* @ts-expect-error Server Component */}
                <Navbar/>
            </Providers>
            {/* allow for more height on mobile devices */}
            <div className="h-40 md:hidden"></div>
        </body>
        </html>
    );
}
