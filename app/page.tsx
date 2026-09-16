"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLenis } from "@/lib/hooks/useLenis";
import { PROJECTS, Project } from "@/lib/data/projects";
import { AppleSubnav } from "@/components/chrome/AppleSubnav";
import { AppleHeroStory } from "@/components/scenes/AppleHeroStory";
import { AppleComparison } from "@/components/scenes/AppleComparison";
import { AppleBentoShowcase } from "@/components/scenes/AppleBentoShowcase";
import { ProjectArchive } from "@/components/scenes/ProjectArchive";
import { EngineeringMethod } from "@/components/scenes/EngineeringMethod";
import { ContactSection } from "@/components/scenes/ContactSection";
import { ProjectModal } from "@/components/scenes/ProjectModal";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { ProgressRail } from "@/components/ui/ProgressRail";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { EASE_ENTER } from "@/lib/motion/tokens";

export default function Home() {
  // Initialize Lenis smooth momentum physics
  useLenis();

  // State for Project Deep-Dive inspection drawer
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <main className="relative min-h-screen bg-black text-apple-text selection:bg-apple-blue selection:text-white">
      {/* Static Sub-Pixel Grain Noise to Eliminate Color Banding */}
      <GrainOverlay />

      {/* Right-Side Vertical Progress Rail */}
      <ProgressRail />

      {/* Global ⌘K Command Palette */}
      <CommandPalette onSelectProject={(proj) => setSelectedProject(proj)} />

      {/* Floating Apple Master Nav */}
      <AppleSubnav />

      {/* Apple 280vh Pinned Scrollytelling Storyboard */}
      <AppleHeroStory />

      {/* Apple Comparison Matrix */}
      <AppleComparison />

      {/* Apple Bento Grid Flagship Showcase */}
      <AppleBentoShowcase
        projects={PROJECTS}
        onSelectProject={(proj) => setSelectedProject(proj)}
      />

      {/* About, Bio & Core Toolchain Hubs */}
      <ProjectArchive />

      {/* Architectural Tenets — Apple Stacked Cards */}
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
