"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Check, Copy, ArrowUpRight, Github, Terminal, Send } from "lucide-react";

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState("");
  const [statusText, setStatusText] = useState("");
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
    <footer id="contact" className="py-28 px-6 sm:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
        {/* Left Column (Call to Action & Direct Email) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 space-y-6"
        >
          <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-apple-subtle">
            Get In Touch
          </span>

          <h2 className="font-sans text-4xl sm:text-6xl font-bold tracking-apple-tightest text-white leading-tight">
            Let's Architect <br />
            <span className="text-apple-blue">The Critical Path.</span>
          </h2>

          <p className="max-w-xl text-apple-subtle text-sm sm:text-base font-normal leading-relaxed">
            Open for high-impact senior engineering roles, low-level systems consulting, 
            or sensor fusion / applied AI product development.
          </p>

          {/* Interactive Copy Email Button */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={handleCopyEmail}
              className="flex items-center space-x-3 px-6 py-4 bg-white text-black hover:bg-apple-blue hover:text-white font-mono text-xs uppercase tracking-wider transition-all duration-300 font-semibold rounded-full"
              data-cursor-interactive="true"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>EMAIL COPIED TO CLIPBOARD</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>COPY: {email}</span>
                </>
              )}
            </button>

            <a
              href={`mailto:${email}`}
              className="px-6 py-4 apple-card rounded-full text-white hover:border-apple-blue font-mono text-xs uppercase tracking-wider transition-colors flex items-center space-x-2"
              data-cursor-interactive="true"
            >
              <Mail className="w-4 h-4 text-apple-blue" />
              <span>SEND VIA MAIL CLIENT</span>
            </a>
          </div>
        </motion.div>

        {/* Right Column: Terminal Message Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="lg:col-span-5 apple-card rounded-3xl p-6 space-y-4 font-mono text-xs"
        >
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
        </motion.div>
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
            href="mailto:khuzaima.ahmed.33820@gmail.com"
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
