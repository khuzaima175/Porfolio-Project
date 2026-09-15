"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowUpRight } from "lucide-react";
import { Project } from "@/lib/data/projects";

interface ProjectArchiveProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export function ProjectArchive({ projects, onSelectProject }: ProjectArchiveProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = [
    { label: "ALL WORK", value: "All", count: projects.length },
    {
      label: "SYSTEMS & AI",
      value: "Systems & AI",
      count: projects.filter((p) => p.category === "Systems & AI").length,
    },
    {
      label: "FULL-STACK",
      value: "Full-Stack & Web",
      count: projects.filter((p) => p.category === "Full-Stack & Web").length,
    },
    {
      label: "MOBILE & LOCAL",
      value: "Mobile & Local-First",
      count: projects.filter((p) => p.category === "Mobile & Local-First").length,
    },
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchCat = selectedCategory === "All" || p.category === selectedCategory;
      const matchQuery =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchQuery;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <section id="archive" className="py-28 px-6 sm:px-12 max-w-7xl mx-auto border-t border-white/10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-apple-subtle">
            Complete Archive
          </span>
          <h2 className="font-sans text-4xl sm:text-6xl font-bold tracking-apple-tightest text-white leading-tight mt-3">
            System Index.
          </h2>
        </div>
        <p className="max-w-md text-sm text-apple-subtle font-normal leading-relaxed">
          Comprehensive catalogue of all deployed systems, mathematical models, 
          mobile tools, and creator analytics platforms.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-8 border-b border-white/10">
        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-4 py-2 font-mono text-xs rounded-full border transition-all duration-300 ${
                selectedCategory === cat.value
                  ? "bg-white text-black border-white font-semibold"
                  : "bg-transparent text-apple-subtle border-white/10 hover:text-white hover:border-white/30"
              }`}
              data-cursor-interactive="true"
            >
              {cat.label} ({cat.count})
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[260px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-apple-subtle" />
          <input
            type="text"
            placeholder="Search stack, title, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-apple-gray/60 border border-white/10 rounded-full pl-9 pr-4 py-2.5 text-xs font-mono text-white placeholder:text-apple-subtle/60 focus:outline-none focus:border-apple-blue transition-colors"
          />
        </div>
      </div>

      {/* Directory Table / Grid */}
      <div className="divide-y divide-white/5">
        <AnimatePresence>
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              onClick={() => onSelectProject(project)}
              className="group py-6 px-4 hover:bg-white/[0.03] transition-all duration-300 cursor-pointer flex flex-col lg:flex-row lg:items-center justify-between gap-6 rounded-2xl"
              data-cursor-interactive="true"
              data-cursor-label="VIEW"
            >
              {/* Title & Category */}
              <div className="lg:w-5/12 space-y-1.5">
                <div className="flex items-center space-x-3 font-mono text-xs text-apple-subtle">
                  <span>0{idx + 1}</span>
                  <span className="text-apple-blue uppercase font-medium">{project.category}</span>
                  <span>// {project.year}</span>
                </div>
                <h3 className="font-sans text-xl font-bold text-white group-hover:text-apple-blue transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-xs text-apple-subtle font-normal leading-relaxed">
                  {project.tagline}
                </p>
              </div>

              {/* Core Hard Metric */}
              <div className="lg:w-3/12">
                <div className="p-3 bg-white/5 border border-white/10 rounded-2xl inline-block min-w-[180px]">
                  <div className="text-[10px] font-mono text-apple-subtle uppercase">
                    {project.metrics[0].label}
                  </div>
                  <div className="font-sans text-base font-bold text-apple-blue tabular-nums">
                    {project.metrics[0].value}
                  </div>
                </div>
              </div>

              {/* Tech Stack Matrix */}
              <div className="lg:w-3/12 flex flex-wrap gap-1.5">
                {project.techStack.slice(0, 3).map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[10px] font-mono px-2.5 py-1 bg-white/5 border border-white/10 text-apple-subtle rounded-full"
                  >
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 3 && (
                  <span className="text-[10px] font-mono px-2.5 py-1 text-apple-subtle">
                    +{project.techStack.length - 3}
                  </span>
                )}
              </div>

              {/* Action Icon */}
              <div className="hidden lg:flex items-center justify-end w-1/12">
                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 border border-white/10 group-hover:border-apple-blue group-hover:bg-apple-blue text-white transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <div className="py-16 text-center text-apple-subtle font-mono text-xs">
            NO ARCHITECTURES MATCHING CURRENT CRITERIA.
          </div>
        )}
      </div>
    </section>
  );
}
