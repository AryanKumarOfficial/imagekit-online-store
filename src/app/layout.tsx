import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Providers from "@/app/components/Providers";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import React from "react";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "ImageKit Store - Premium Digital Marketplace",
    description: "Discover and purchase premium digital assets, templates, and resources",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body
            className={`${inter.className} antialiased min-h-screen flex flex-col`}
        >
        <Script
            src={"https://checkout.razorpay.com/v1/checkout.js"}
            strategy={"lazyOnload"}
        />
        <Providers>
            <Header/>
            <main className={"container mx-auto px-4 py-8 flex-grow"}>
                {children}
            </main>
            <Footer/>
        </Providers>
        </body>
        </html>
    );
}
