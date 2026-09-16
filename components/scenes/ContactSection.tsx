"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Mail,
  Check,
  Copy,
  ArrowUpRight,
  Github,
  Terminal,
  Send,
  ArrowUp,
  ShieldCheck,
  Clock,
  MapPin,
  Sparkles,
} from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { EASE_ENTER, SPRING_BOUNCE_SUBTLE } from "@/lib/motion/tokens";
import { scrollToTarget } from "@/lib/utils/scroll";

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState("");
  const [senderName, setSenderName] = useState("");
  const [senderContact, setSenderContact] = useState("");
  const [statusText, setStatusText] = useState("");
  const [isTransmitting, setIsTransmitting] = useState(false);
  const email = "khuzaima.ahmed.33820@gmail.com";

  // Parallax for footer wordmark
  const { scrollYProgress } = useScroll();
  const wordmarkX = useTransform(scrollYProgress, [0.85, 1.0], ["-2%", "2%"]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsTransmitting(true);
    setStatusText("TRANSMITTING ENCRYPTED PACKET...");

    // Build mailto fallback if user wants email client transmission
    const mailSubject = encodeURIComponent(
      `Engineering Inquiry${senderName ? ` from ${senderName}` : ""}`
    );
    const mailBody = encodeURIComponent(
      `${message}\n\nSender: ${senderName || "Anonymous"}\nContact: ${
        senderContact || "Not provided"
      }`
    );
    const mailtoUrl = `mailto:${email}?subject=${mailSubject}&body=${mailBody}`;

    setTimeout(() => {
      setStatusText("PACKET PREPARED // OPENING DISPATCH GATEWAY...");
      setIsTransmitting(false);

      // Open mailto link
      window.location.href = mailtoUrl;

      setTimeout(() => {
        setStatusText("DISPATCH SUCCESSFUL // READY FOR TRANSMISSION");
        setMessage("");
        setSenderName("");
        setSenderContact("");
        setTimeout(() => setStatusText(""), 4000);
      }, 1000);
    }, 600);
  };

  const scrollToTop = () => {
    scrollToTarget(0);
  };

  return (
    <footer
      id="contact"
      className="py-24 px-4 sm:px-8 lg:px-12 max-w-[95vw] 2xl:max-w-[1760px] mx-auto border-t border-white/10 overflow-hidden select-none"
    >
      <div className="pb-16 border-b border-white/10">
        {/* Balanced Widescreen 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Asymmetric Editorial Narrative & Quick Actions (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            <Reveal variant="slide-right">
              <div className="flex items-center gap-3">
                <span className="inline-block text-xs sm:text-sm font-sans font-semibold tracking-wider uppercase text-apple-blue font-mono">
                  Get In Touch // Direct Dispatch
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-apple-blue/60" />
                <span className="text-xs sm:text-sm font-mono text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Active 2026
                </span>
              </div>
            </Reveal>

            {/* High-Impact Headline */}
            <div className="space-y-2">
              <h2 className="font-sans text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]">
                Let's Architect{" "}
                <span className="text-blue-sweep block sm:inline">
                  The Critical Path.
                </span>
              </h2>
            </div>

            <Reveal variant="blur-rise" delay={0.15}>
              <p className="text-neutral-300 text-base sm:text-xl font-normal leading-relaxed max-w-xl">
                Open for high-impact senior engineering roles, low-level systems
                consulting, or sensor fusion / applied AI product development.
              </p>
            </Reveal>

            {/* Direct Action Buttons */}
            <Reveal variant="blur-rise" delay={0.25}>
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                {/* Copy email with spring animation */}
                <motion.button
                  layout
                  transition={SPRING_BOUNCE_SUBTLE}
                  onClick={handleCopyEmail}
                  className={`flex items-center space-x-2.5 px-6 py-3.5 font-sans text-sm font-semibold tracking-wide transition-all duration-200 rounded-full shadow-lg ${
                    copied
                      ? "bg-emerald-500 text-white shadow-emerald-500/30 scale-105"
                      : "bg-white text-black hover:bg-apple-blue hover:text-white shadow-white/10 hover:shadow-apple-blue/25 hover:scale-[1.02] active:scale-[0.98]"
                  }`}
                  data-cursor-interactive="true"
                >
                  {copied ? (
                    <>
                      <motion.div
                        initial={{ rotate: -45, scale: 0.5 }}
                        animate={{ rotate: 0, scale: 1 }}
                        transition={SPRING_BOUNCE_SUBTLE}
                      >
                        <Check className="w-4 h-4 text-white" />
                      </motion.div>
                      <span>Email Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy Email Address</span>
                    </>
                  )}
                </motion.button>

                {/* Mail Client Button */}
                <a
                  href={`mailto:${email}`}
                  className="px-6 py-3.5 bg-white/[0.08] hover:bg-white/[0.15] border border-white/15 hover:border-white/30 rounded-full text-white font-sans text-sm font-semibold transition-all duration-200 flex items-center space-x-2.5 shadow-sm hover:scale-[1.02] active:scale-[0.98] backdrop-blur-md"
                  data-cursor-interactive="true"
                >
                  <Mail className="w-4 h-4 text-apple-blue" />
                  <span>Open Email Client</span>
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/khuzaima175"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 bg-white/[0.08] hover:bg-white/[0.15] border border-white/15 hover:border-white/30 rounded-full text-white font-sans text-sm font-semibold transition-all duration-200 flex items-center space-x-2.5 shadow-sm hover:scale-[1.02] active:scale-[0.98] backdrop-blur-md"
                  data-cursor-interactive="true"
                >
                  <Github className="w-4 h-4 text-apple-blue" />
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </a>
              </div>
            </Reveal>

            {/* Verified Operational Telemetry Badges */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl">
              <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono text-neutral-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>TLS 1.3 Verified</span>
              </div>
              <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono text-neutral-300">
                <Clock className="w-4 h-4 text-apple-blue shrink-0" />
                <span>&lt; 24h Response</span>
              </div>
              <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono text-neutral-300">
                <MapPin className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Karachi (UTC+5)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Embedded Direct Dispatch Terminal (5 Cols) */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: EASE_ENTER }}
              className="bg-[#121215]/95 border border-white/15 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl backdrop-blur-2xl relative overflow-hidden"
            >
              {/* Radial Accent Glow */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-blue-500/20 via-purple-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

              {/* Console Top Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-neutral-400 relative z-10">
                <div className="flex items-center space-x-2.5">
                  <Terminal className="w-4 h-4 text-apple-blue" />
                  <span className="font-sans text-xs font-semibold uppercase tracking-wider text-white">
                    Direct Dispatch Console
                  </span>
                </div>
                <span className="text-[11px] font-mono font-semibold text-emerald-400 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  GATEWAY ONLINE
                </span>
              </div>

              {/* Simulated System Handshake Logs */}
              <div className="space-y-1 font-mono text-[11px] text-apple-subtle bg-black/60 p-3 rounded-xl border border-white/10 relative z-10">
                <div className="flex items-center space-x-2">
                  <span className="text-apple-blue">&gt;</span>
                  <span>HANDSHAKE // 2048-BIT ENCRYPTED CHANNEL</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-emerald-400">&gt;</span>
                  <span>ROUTE // DIRECT TRANSMIT TO KHUZAIMA AHMED</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-purple-400">&gt;</span>
                  <span>STATUS // BUFFER OPEN • ZERO-LATENCY READY</span>
                </div>
              </div>

              {/* Dispatch Form */}
              <form
                onSubmit={handleDispatch}
                className="space-y-4 relative z-10"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-neutral-400 uppercase font-mono font-medium mb-1.5">
                      Your Name / Org
                    </label>
                    <input
                      type="text"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="e.g. Sarah Connor"
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-3.5 py-2.5 text-white font-sans text-xs focus:outline-none focus:border-apple-blue transition-colors placeholder:text-neutral-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-neutral-400 uppercase font-mono font-medium mb-1.5">
                      Contact Email / Handle
                    </label>
                    <input
                      type="text"
                      value={senderContact}
                      onChange={(e) => setSenderContact(e.target.value)}
                      placeholder="e.g. sarah@cyberdyne.io"
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-3.5 py-2.5 text-white font-sans text-xs focus:outline-none focus:border-apple-blue transition-colors placeholder:text-neutral-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-neutral-400 uppercase font-mono font-medium mb-1.5">
                    Message Payload
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Brief project scope, engineering challenge, or collaboration proposal..."
                    className="w-full bg-black/50 border border-white/10 rounded-xl p-3.5 text-white font-sans text-xs focus:outline-none focus:border-apple-blue transition-colors resize-none placeholder:text-neutral-600"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
                  <span className="text-[11px] font-mono text-apple-subtle">
                    {statusText || "Instant mailto routing with 1-click fallback"}
                  </span>
                  <button
                    type="submit"
                    disabled={isTransmitting || !message.trim()}
                    className={`flex items-center space-x-2 px-6 py-2.5 rounded-full font-sans font-semibold text-xs transition-all shadow-md active:scale-95 ${
                      message.trim()
                        ? "bg-apple-blue text-white hover:bg-blue-400 shadow-apple-blue/25 hover:scale-105"
                        : "bg-white/10 text-neutral-500 cursor-not-allowed"
                    }`}
                    data-cursor-interactive="true"
                  >
                    <span>{isTransmitting ? "Transmitting..." : "Transmit Dispatch"}</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Signature Scaled Stroke-Only Footer Wordmark with Subtle Parallax */}
      <div className="pt-14 pb-8 overflow-hidden relative select-none">
        <motion.div
          className="font-sans text-[7vw] sm:text-[7.2vw] font-black uppercase tracking-apple-tightest text-transparent leading-none whitespace-nowrap text-center opacity-20 hover:opacity-35 transition-opacity cursor-pointer duration-300"
          style={{
            WebkitTextStroke: "1.2px rgba(255, 255, 255, 0.4)",
            x: wordmarkX,
          }}
          onClick={scrollToTop}
          title="Click to back to top"
        >
          KHUZAIMA AHMED
        </motion.div>
      </div>

      {/* Bottom Colophon & Smooth Back to Top */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-xs text-neutral-400 pt-4">
        <div>
          <span>&copy; {new Date().getFullYear()} Khuzaima Ahmed. </span>
          <span className="text-neutral-500">
            Built with deterministic architecture.
          </span>
        </div>

        <div className="flex items-center space-x-6">
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-1.5 text-neutral-400 hover:text-white transition-colors font-mono"
            data-cursor-interactive="true"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3 h-3 text-apple-blue" />
          </button>

          <a
            href="https://github.com/khuzaima175"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 text-neutral-400 hover:text-apple-blue transition-colors"
            data-cursor-interactive="true"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
            <ArrowUpRight className="w-3 h-3 opacity-60" />
          </a>

          <a
            href={`mailto:${email}`}
            className="flex items-center space-x-1.5 text-neutral-400 hover:text-apple-blue transition-colors"
            data-cursor-interactive="true"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email</span>
            <ArrowUpRight className="w-3 h-3 opacity-60" />
          </a>
        </div>
      </div>
    </footer>
  );
}
