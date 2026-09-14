"use client";

import React, { useState } from "react";
import { FrameTicks } from "@/components/ui/FrameTicks";

const EMAIL = "khuzaima175@gmail.com";

export const Dispatch: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <footer id="contact" className="theme-inverted bg-surface text-ink pt-24 pb-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line pb-4 text-xs text-ink-muted">
          <div className="flex items-center gap-3">
            <span className="font-mono">S9 // DISPATCH & COLOPHON</span>
            <span>Direct communications & engineering colophon</span>
          </div>
          <div className="font-mono text-[11px] text-signal">● AVAILABLE FOR HIRE</div>
        </div>

        {/* Main Dispatch Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-16 items-start">
          <div className="lg:col-span-8">
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-ink leading-tight max-w-2xl">
              Initiate transmission.
            </h2>
            <p className="text-base sm:text-lg text-ink-muted leading-relaxed mt-4 max-w-xl">
              Currently open for systems engineering, DSP algorithm implementation, and local AI
              infrastructure engagements.
            </p>

            {/* Direct Email Action Button */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={handleCopy}
                className="px-6 py-3.5 bg-signal text-surface text-xs font-mono font-medium hover:opacity-90 transition-all flex items-center gap-3 relative"
              >
                <span>{copied ? "COPIED TO CLIPBOARD" : EMAIL}</span>
                <span className="text-[10px] bg-surface/20 px-1.5 py-0.5">
                  {copied ? "✓" : "COPY"}
                </span>
              </button>

              <a
                href={`mailto:${EMAIL}`}
                className="px-5 py-3.5 bg-surface-2 border border-line text-ink text-xs font-medium hover:border-line-heavy transition-colors"
              >
                Send via client ↗
              </a>
            </div>
          </div>

          {/* Right Column: External References */}
          <div className="lg:col-span-4 space-y-4">
            <div className="border border-line bg-surface-2 p-5 relative">
              <FrameTicks />
              <div className="text-xs font-mono text-ink-muted pb-2 border-b border-line mb-3">
                COMMUNICATION NODES
              </div>

              <div className="space-y-3 text-xs">
                <a
                  href="https://github.com/khuzaima175"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-ink hover:text-signal transition-colors group"
                >
                  <span>GitHub</span>
                  <span className="font-mono text-signal group-hover:translate-x-0.5 transition-transform">
                    github.com/khuzaima175 ↗
                  </span>
                </a>

                <a
                  href="https://linkedin.com/in/syedkhuzaima"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-ink hover:text-signal transition-colors group"
                >
                  <span>LinkedIn</span>
                  <span className="font-mono text-signal group-hover:translate-x-0.5 transition-transform">
                    linkedin.com/in/syedkhuzaima ↗
                  </span>
                </a>

                <a
                  href="https://github.com/khuzaima175/Porfolio-Project"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-ink hover:text-signal transition-colors group"
                >
                  <span>Repository</span>
                  <span className="font-mono text-signal group-hover:translate-x-0.5 transition-transform">
                    source-tree ↗
                  </span>
                </a>
              </div>
            </div>

            {/* Status Line Card */}
            <div className="border border-line bg-surface-2 p-4 text-xs text-ink-muted leading-relaxed">
              <div className="flex items-center gap-2 text-ink font-medium mb-1">
                <span className="w-2 h-2 rounded-full bg-signal" />
                <span>Operating status</span>
              </div>
              Active. Available for high-throughput backend architecture, DSP pipeline optimization,
              and low-overhead AI daemon development.
            </div>
          </div>
        </div>

        {/* Colophon & Technical Attribution */}
        <div className="border-t border-line pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs text-ink-muted font-mono">
          <div className="space-y-1">
            <div>SYED KHUZAIMA // SYSTEMS & AI ENGINEERING</div>
            <div>LOCATION: KARACHI, PAKISTAN (UTC+5)</div>
          </div>

          <div className="space-y-1 text-left md:text-right text-[11px]">
            <div>TYPEFACES: GENERAL SANS · JETBRAINS MONO</div>
            <div>STACK: NEXT.JS 14 · TAILWIND CSS · GSAP 3 · LENIS</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Dispatch;
