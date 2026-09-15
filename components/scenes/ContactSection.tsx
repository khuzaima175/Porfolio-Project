"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Check, Copy, ArrowUpRight, Github, Terminal, Send, MessageSquare, ChevronDown } from "lucide-react";

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState("");
  const [statusText, setStatusText] = useState("");
  const [terminalOpen, setTerminalOpen] = useState(false);
  const email = "khuzaima.ahmed.33820@gmail.com";

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

  return (
    <footer id="contact" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto">
      <div className="pb-14 border-b border-white/10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-apple-subtle">
            Get In Touch
          </span>

          <h2 className="font-sans text-4xl sm:text-6xl font-bold tracking-apple-tightest text-white leading-tight mt-3">
            Let's Architect <br />
            <span className="text-apple-blue">The Critical Path.</span>
          </h2>

          <p className="text-apple-subtle text-sm font-normal leading-relaxed mt-4 max-w-md">
            Open for high-impact senior engineering roles, low-level systems consulting,
            or sensor fusion / applied AI product development.
          </p>
        </motion.div>

        {/* Action buttons row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          {/* Copy email */}
          <button
            onClick={handleCopyEmail}
            className="flex items-center space-x-2.5 px-6 py-3.5 bg-white text-black hover:bg-apple-blue hover:text-white font-mono text-xs uppercase tracking-wider transition-all duration-300 font-semibold rounded-full"
            data-cursor-interactive="true"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span>COPIED</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>COPY EMAIL</span>
              </>
            )}
          </button>

          {/* Mail client link */}
          <a
            href={`mailto:${email}`}
            className="px-6 py-3.5 apple-card rounded-full text-white hover:border-apple-blue font-mono text-xs uppercase tracking-wider transition-colors flex items-center space-x-2"
            data-cursor-interactive="true"
          >
            <Mail className="w-4 h-4 text-apple-blue" />
            <span>OPEN MAIL</span>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/khuzaima175"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 apple-card rounded-full text-white hover:border-apple-blue font-mono text-xs uppercase tracking-wider transition-colors flex items-center space-x-2"
            data-cursor-interactive="true"
          >
            <Github className="w-4 h-4 text-apple-blue" />
            <span>GITHUB</span>
            <ArrowUpRight className="w-3 h-3 opacity-50" />
          </a>

          {/* Send message toggle */}
          <button
            onClick={() => setTerminalOpen((v) => !v)}
            className="flex items-center space-x-2 px-5 py-3.5 rounded-full border border-white/15 text-apple-subtle hover:text-white hover:border-white/30 transition-all font-mono text-xs"
            data-cursor-interactive="true"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>SEND MESSAGE</span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-300 ${terminalOpen ? "rotate-180" : ""}`}
            />
          </button>
        </motion.div>

        {/* Collapsible dispatch terminal */}
        <AnimatePresence>
          {terminalOpen && (
            <motion.div
              key="terminal"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-6 max-w-lg apple-card rounded-3xl p-6 space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 text-apple-subtle">
                  <div className="flex items-center space-x-2">
                    <Terminal className="w-3.5 h-3.5 text-apple-blue" />
                    <span>DIRECT DISPATCH CONSOLE</span>
                  </div>
                  <span className="text-[10px] text-emerald-400">READY</span>
                </div>

                <form onSubmit={handleDispatch} className="space-y-4">
                  <div>
                    <label className="block text-[10px] text-apple-subtle uppercase mb-1">
                      MESSAGE PAYLOAD
                    </label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Brief project details, timeline, or engineering inquiry..."
                      className="w-full bg-black/60 border border-white/10 rounded-2xl p-3 text-white font-mono text-xs focus:outline-none focus:border-apple-blue transition-colors resize-none placeholder:text-apple-subtle/60"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-apple-subtle">
                      {statusText || "SECURE DISPATCH // 0% TELEMETRY"}
                    </span>
                    <button
                      type="submit"
                      className="flex items-center space-x-1.5 px-5 py-2.5 bg-apple-blue text-white rounded-full hover:bg-blue-400 transition-colors font-semibold"
                      data-cursor-interactive="true"
                    >
                      <span>TRANSMIT</span>
                      <Send className="w-3 h-3" />
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Colophon & Socials */}
      <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-apple-subtle">
        <div>
          <span>&copy; {new Date().getFullYear()} KHUZAIMA AHMED. </span>
          <span className="text-apple-subtle/60">BUILT WITH DETERMINISTIC ARCHITECTURE.</span>
        </div>

        <div className="flex items-center space-x-6">
          <a
            href="https://github.com/khuzaima175"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-apple-subtle hover:text-apple-blue transition-colors"
            data-cursor-interactive="true"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GITHUB</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>

          <a
            href={`mailto:${email}`}
            className="flex items-center space-x-1 text-apple-subtle hover:text-apple-blue transition-colors"
            data-cursor-interactive="true"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>EMAIL</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </footer>
  );
}
