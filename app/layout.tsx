import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/chrome/CustomCursor";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Syed Khuzaima — Engineering & AI Systems Portfolio",
  description:
    "Engineering signal pipelines, spatial estimators, and intelligent local software. A laboratory instrument portfolio with verified telemetry.",
  keywords: [
    "Syed Khuzaima",
    "Systems Engineer",
    "DSP",
    "Web Audio Worklets",
    "Kalman Filter",
    "GNSS",
    "FastAPI",
    "Next.js",
    "AI Inference",
  ],
  authors: [{ name: "Syed Khuzaima" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600&display=swap"
        />
      </head>
      <body className="antialiased font-sans bg-surface text-ink selection:bg-signal selection:text-surface">
        {/* Static 2% monochrome SVG noise overlay */}
        <div className="noise-overlay" aria-hidden="true" />

        {/* 6px -> 28px Hairline Custom Cursor */}
        <CustomCursor />

        {children}
      </body>
    </html>
  );
}
