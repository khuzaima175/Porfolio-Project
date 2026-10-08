"use client";

import { useState } from "react";
import { useLenis } from "@/lib/hooks/useLenis";
import { PROJECTS, Project } from "@/lib/data/projects";
import { Subnav } from "@/components/chrome/Subnav";
import { HeroStory } from "@/components/scenes/HeroStory";
import { ComparisonSection } from "@/components/scenes/ComparisonSection";
import { BentoShowcase } from "@/components/scenes/BentoShowcase";
import { ProjectArchive } from "@/components/scenes/ProjectArchive";
import { EngineeringMethod } from "@/components/scenes/EngineeringMethod";
import { ContactSection } from "@/components/scenes/ContactSection";
import { ProjectModal } from "@/components/scenes/ProjectModal";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { ProgressRail } from "@/components/ui/ProgressRail";
import { GrainOverlay } from "@/components/ui/GrainOverlay";

export default function Home() {
  // Initialize smooth momentum physics
  useLenis();

  // State for Project Deep-Dive inspection drawer
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <main className="relative min-h-screen bg-black text-brand-text selection:bg-brand-blue selection:text-white">
      {/* Static Sub-Pixel Grain Noise to Eliminate Color Banding */}
      <GrainOverlay />

      {/* Right-Side Vertical Progress Rail */}
      <ProgressRail />

      {/* Global ⌘K Command Palette */}
      <CommandPalette onSelectProject={(proj) => setSelectedProject(proj)} />

      {/* Floating Master Nav */}
      <Subnav />

      {/* 280vh Pinned Scrollytelling Storyboard */}
      <HeroStory />

      {/* Benchmark Comparison Matrix */}
      <ComparisonSection />

      {/* Bento Grid Flagship Showcase & Pro Suite */}
      <BentoShowcase
        projects={PROJECTS}
        onSelectProject={(proj) => setSelectedProject(proj)}
      />

      {/* About, Bio & Core Toolchain Hubs */}
      <ProjectArchive />

      {/* Architectural Tenets — Stacked Cards */}
      <EngineeringMethod />

      {/* Dispatch Terminal & Footer */}
      <ContactSection />

      {/* Project Deep-Dive Sliding Drawer Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </main>
  );
}
