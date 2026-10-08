import type { Metadata } from "next";
import "./globals.css";
import { CustomCursor } from "@/components/chrome/CustomCursor";

export const metadata: Metadata = {
  title: "Khuzaima Ahmed — Systems & AI Engineer",
  description:
    "Portfolio of Khuzaima Ahmed. Systems, DSP, sensor fusion, and local-first AI engineering. Featuring GNSS precision positioning, real-time audio biquad synthesis, and zero-overhead Windows background telemetry.",
  keywords: [
    "Systems Engineer",
    "AI Engineer",
    "DSP",
    "GNSS",
    "Kalman Filtering",
    "Web Audio API",
    "Local-First",
    "FastAPI",
    "TypeScript",
  ],
  authors: [{ name: "Khuzaima Ahmed" }],
  openGraph: {
    title: "Khuzaima Ahmed — Systems & AI Engineer",
    description:
      "Minimalist engineering portfolio: zero-overhead sensory daemons, multi-stream GNSS fusion, and real-time biquad audio synthesis.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-black text-brand-text antialiased selection:bg-brand-blue selection:text-white font-sans">
        {/* Precision Cursor */}
        <CustomCursor />

        {/* Content */}
        {children}
      </body>
    </html>
  );
}
