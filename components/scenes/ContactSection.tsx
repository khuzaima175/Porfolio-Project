"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Mail, Check, Copy, ArrowUpRight, Github, Terminal, Send, MessageSquare, ChevronDown, ArrowUp } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { EASE_ENTER, SPRING_BOUNCE_SUBTLE } from "@/lib/motion/tokens";
import { scrollToTarget } from "@/lib/utils/scroll";

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState("");
  const [statusText, setStatusText] = useState("");
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalLog, setTerminalLog] = useState<string[]>([]);
  const email = "khuzaima.ahmed.33820@gmail.com";

  // Parallax for footer wordmark
  const { scrollYProgress } = useScroll();
  const wordmarkX = useTransform(scrollYProgress, [0.8, 1.0], ["-3%", "3%"]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setStatusText("TRANSMITTING ENCRYPTED PACKET...");
    setTimeout(() => {
      setStatusText("DISPATCH SUCCESSFUL // INBOX DELIVERED");
      setMessage("");
      setTimeout(() => setStatusText(""), 4000);
    }, 800);
  };

  const scrollToTop = () => {
    scrollToTarget(0);
  };

  useEffect(() => {
    if (terminalOpen) {
      setTerminalLog([]);
      const log1 = setTimeout(() => {
        setTerminalLog((prev) => [...prev, "SECURE_DISPATCH // PROTOCOL INITIALIZED"]);
      }, 100);
      const log2 = setTimeout(() => {
        setTerminalLog((prev) => [...prev, "HANDSHAKE // 2048-BIT SESSION SECURED"]);
      }, 250);
      const log3 = setTimeout(() => {
        setTerminalLog((prev) => [...prev, "CHANNEL // READY FOR ENCRYPTED TRANSMISSION"]);
      }, 400);

      return () => {
        clearTimeout(log1);
        clearTimeout(log2);
        clearTimeout(log3);
      };
    }
  }, [terminalOpen]);

  return (
    <footer id="contact" className="py-28 px-6 sm:px-12 max-w-7xl mx-auto overflow-hidden">
      <div className="pb-16 border-b border-white/10">
        {/* Asymmetric Header */}
        <div className="max-w-2xl space-y-3">
          <Reveal variant="slide-right">
            <span className="text-xs sm:text-sm font-sans font-semibold tracking-wider uppercase text-apple-blue font-mono">
              Get In Touch
            </span>
          </Reveal>

          <div className="space-y-1">
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "110%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, ease: EASE_ENTER }}
                className="font-sans text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight"
              >
                Let's Architect
              </motion.h2>
            </div>

            <div className="overflow-hidden">
              <motion.h2
                initial={{ x: 60, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.75, delay: 0.1, ease: EASE_ENTER }}
                className="font-sans text-4xl sm:text-6xl font-bold tracking-tight leading-tight text-blue-sweep"
              >
                The Critical Path.
              </motion.h2>
            </div>
          </div>

          <Reveal variant="blur-rise" delay={0.2}>
            <p className="text-neutral-400 text-base sm:text-lg font-normal leading-relaxed pt-2 max-w-xl">
              Open for high-impact senior engineering roles, low-level systems consulting,
              or sensor fusion / applied AI product development.
            </p>
          </Reveal>
        </div>

        {/* Action buttons row with Joyous Spring Copy Feedback */}
        <motion.div
          initial={{ opacity: 0, y: 25, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.15, ease: EASE_ENTER }}
          className="mt-10 flex flex-wrap items-center gap-3.5"
        >
          {/* Copy email with layout expansion & spring */}
          <motion.button
            layout
            transition={SPRING_BOUNCE_SUBTLE}
            onClick={handleCopyEmail}
            className={`flex items-center space-x-2.5 px-6 py-3.5 font-sans text-sm font-semibold tracking-wide transition-colors rounded-full shadow-lg ${
              copied
                ? "bg-emerald-500 text-white"
                : "bg-white text-black hover:bg-apple-blue hover:text-white"
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
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Email</span>
              </>
            )}
          </motion.button>

          {/* Mail client link */}
          <a
            href={`mailto:${email}`}
            className="px-6 py-3.5 bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-white/25 rounded-full text-white font-sans text-sm font-semibold transition-all duration-200 flex items-center space-x-2.5 shadow-sm hover:scale-[1.02] active:scale-[0.98]"
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
            className="px-6 py-3.5 bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-white/25 rounded-full text-white font-sans text-sm font-semibold transition-all duration-200 flex items-center space-x-2.5 shadow-sm hover:scale-[1.02] active:scale-[0.98]"
            data-cursor-interactive="true"
          >
            <Github className="w-4 h-4 text-apple-blue" />
            <span>GitHub</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
          </a>

          {/* Send message toggle */}
          <button
            onClick={() => setTerminalOpen((v) => !v)}
            className="flex items-center space-x-2.5 px-6 py-3.5 rounded-full border border-white/15 text-neutral-300 hover:text-white hover:border-white/30 transition-all font-sans text-sm font-medium"
            data-cursor-interactive="true"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Send Direct Message</span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-300 ${
                terminalOpen ? "rotate-180 text-apple-blue" : ""
              }`}
            />
          </button>
        </motion.div>

        {/* Collapsible dispatch terminal with Typewriter initialization */}
        <AnimatePresence>
          {terminalOpen && (
            <motion.div
              key="terminal"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: EASE_ENTER }}
              className="overflow-hidden"
            >
              <div className="mt-8 max-w-lg bg-[#121214] border border-white/15 rounded-3xl p-7 space-y-5 shadow-2xl backdrop-blur-xl">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 text-neutral-400">
                  <div className="flex items-center space-x-2.5">
                    <Terminal className="w-4 h-4 text-apple-blue" />
                    <span className="font-sans text-xs font-semibold uppercase tracking-wider text-white">
                      Direct Dispatch Console
                    </span>
                  </div>
                  <span className="text-xs font-sans font-semibold text-emerald-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Ready
                  </span>
                </div>

                {/* Simulated Telemetry Handshake Logs */}
                <div className="space-y-1 font-mono text-[10px] text-apple-subtle bg-black/50 p-3 rounded-xl border border-white/5">
                  {terminalLog.map((log, lIdx) => (
                    <div key={lIdx} className="flex items-center space-x-2">
                      <span className="text-apple-blue">&gt;</span>
                      <span>{log}</span>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleDispatch} className="space-y-4">
                  <div>
                    <label className="block text-xs text-neutral-400 uppercase font-sans font-semibold tracking-wider mb-2">
                      Message Payload
                    </label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Brief project details, timeline, or engineering inquiry..."
                      className="w-full bg-black/60 border border-white/10 rounded-2xl p-4 text-white font-sans text-sm focus:outline-none focus:border-apple-blue transition-colors resize-none placeholder:text-neutral-500"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs font-sans text-neutral-400">
                      {statusText || "Secure Dispatch // Encrypted transmission"}
                    </span>
                    <button
                      type="submit"
                      className="flex items-center space-x-2 px-6 py-2.5 bg-apple-blue text-white rounded-full hover:bg-blue-400 transition-all font-sans font-semibold text-sm shadow-md shadow-apple-blue/20 active:scale-95"
                      data-cursor-interactive="true"
                    >
                      <span>Transmit</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Signature 12vw Stroke-Only Footer Wordmark with Horizontal Parallax */}
      <div className="pt-12 pb-6 overflow-hidden relative select-none">
        <motion.div
          className="font-sans text-[11vw] font-black uppercase tracking-apple-tightest text-transparent leading-none whitespace-nowrap text-center opacity-15 hover:opacity-25 transition-opacity cursor-pointer"
          style={{
            WebkitTextStroke: "1.5px rgba(255, 255, 255, 0.4)",
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
          <span className="text-neutral-500">Built with deterministic architecture.</span>
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
