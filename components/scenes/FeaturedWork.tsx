"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Activity, Radio, Cpu, Layers } from "lucide-react";
import { Project } from "@/lib/data/projects";

interface FeaturedWorkProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export function FeaturedWork({ projects, onSelectProject }: FeaturedWorkProps) {
  const featured = projects.filter((p) => p.featured);

  return (
    <section id="work" className="py-24 px-6 sm:px-8 max-w-7xl mx-auto border-b border-border-subtle">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="flex items-center space-x-2 font-mono text-xs text-vermilion tracking-widest uppercase mb-2">
            <span>[01]</span>
            <span>FLAGSHIP ARCHITECTURES</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl font-bold tracking-tight text-bone uppercase">
            Featured Systems
          </h2>
        </div>
        <p className="max-w-md text-sm text-bone-muted font-light leading-relaxed">
          Mission-critical engines built for mathematical precision, deterministic sensor fusion, 
          and sub-millisecond local execution without cloud dependency.
        </p>
      </div>

      {/* Featured Projects Grid / Stack */}
      <div className="space-y-16 lg:space-y-24">
        {featured.map((project, index) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="group grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-slate/40 border border-border-subtle hover:border-border-medium transition-all duration-500 p-6 sm:p-8"
          >
            {/* Visual Media Column (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between overflow-hidden relative min-h-[300px] lg:min-h-[420px] bg-carbon border border-border-subtle group-hover:border-vermilion/40 transition-colors">
              {project.image && (
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-carbon via-transparent to-transparent opacity-60" />
                </div>
              )}

              {/* Media Floating Telemetry Overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-bone bg-carbon/85 backdrop-blur-md px-3 py-2 border border-border-subtle">
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-vermilion" />
                  <span className="text-pewter">CORE SPECIMEN //</span>
                  <span>{project.slug}</span>
                </div>
                <span className="text-bone-muted tabular-nums">{project.year}</span>
              </div>
            </div>

            {/* Content & Metrics Column (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between font-mono text-xs text-pewter mb-3">
                  <span>SYS_ORD // 0{index + 1}</span>
                  <span className="text-vermilion font-medium uppercase">{project.category}</span>
                </div>

                <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-bone group-hover:text-vermilion transition-colors leading-tight">
                  {project.title}
                </h3>

                <p className="text-bone-muted text-sm leading-relaxed mt-3 font-light">
                  {project.executivePitch}
                </p>
              </div>

              {/* Hard Metrics Row */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                {project.metrics.slice(0, 2).map((metric, mIdx) => (
                  <div key={mIdx} className="p-3 bg-carbon/90 border border-border-subtle">
                    <div className="text-pewter font-mono text-[10px] uppercase">
                      {metric.label}
                    </div>
                    <div className="font-editorial text-lg font-bold text-bone tabular-nums text-vermilion mt-0.5">
                      {metric.value}
                    </div>
                    <div className="text-[10px] text-bone-muted truncate mt-0.5">
                      {metric.description}
                    </div>
                  </div>
                ))}
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.slice(0, 5).map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[11px] font-mono px-2 py-0.5 bg-slate-surface border border-border-subtle text-bone-muted"
                  >
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 5 && (
                  <span className="text-[11px] font-mono px-2 py-0.5 text-pewter">
                    +{project.techStack.length - 5}
                  </span>
                )}
              </div>

              {/* Deep-Dive Inspection Trigger */}
              <button
                onClick={() => onSelectProject(project)}
                className="w-full flex items-center justify-between px-4 py-3 bg-slate border border-border-medium text-bone font-mono text-xs uppercase tracking-wider hover:bg-vermilion hover:text-bone hover:border-vermilion transition-all duration-300 group/btn"
                data-cursor-interactive="true"
                data-cursor-label="INSPECT"
              >
                <span>OPEN ARCHITECTURAL DOSSIER</span>
                <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
