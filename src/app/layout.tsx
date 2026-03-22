import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Suspense } from "react";
import "./globals.css";
import { AuthProvider } from "./hooks/auth-hook";
import QueryString from "./components/QueryString";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "mToken",
  description: "mToken_Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <Suspense fallback={null}>
            <QueryString />
          </Suspense>

          {children}
        </AuthProvider>

        <Script
          src="https://czp.dga.or.th/cportal/sdk/iu/v4/sdk.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}