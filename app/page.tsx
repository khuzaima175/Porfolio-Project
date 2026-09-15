"use client";

import { useState } from "react";
import { useLenis } from "@/lib/hooks/useLenis";
import { PROJECTS, Project } from "@/lib/data/projects";
import { AppleSubnav } from "@/components/chrome/AppleSubnav";
import { AppleHeroStory } from "@/components/scenes/AppleHeroStory";
import { AppleComparison } from "@/components/scenes/AppleComparison";
import { AppleBentoShowcase } from "@/components/scenes/AppleBentoShowcase";
import { SpecimensSection } from "@/components/scenes/SpecimensSection";
import { ProjectArchive } from "@/components/scenes/ProjectArchive";
import { EngineeringMethod } from "@/components/scenes/EngineeringMethod";
import { ContactSection } from "@/components/scenes/ContactSection";
import { ProjectModal } from "@/components/scenes/ProjectModal";

export default function Home() {
  // Initialize Lenis smooth momentum physics
  useLenis();

  // State for Project Deep-Dive inspection drawer
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <main className="relative min-h-screen bg-black text-apple-text selection:bg-apple-blue selection:text-white">
      {/* Floating Apple Master Nav */}
      <AppleSubnav />

      {/* Apple 280vh Pinned Scrollytelling Storyboard */}
      <AppleHeroStory />

      {/* Apple Comparison Matrix (Matches iPhone 18 Pro Screenshot) */}
      <AppleComparison />

      {/* Apple Bento Grid Flagship Showcase */}
      <AppleBentoShowcase
        projects={PROJECTS}
        onSelectProject={(proj) => setSelectedProject(proj)}
      />

      {/* Live Engineering Interactive Specimens */}
      <SpecimensSection />

      {/* Complete Index & Project Directory (All 9 Projects) */}
      <ProjectArchive
        projects={PROJECTS}
        onSelectProject={(proj) => setSelectedProject(proj)}
      />

      {/* Engineering Philosophy & Tenets */}
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
