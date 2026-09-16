/**
 * Unified High-Performance Motion Design Tokens
 * 
 * Strict grammar across the entire portfolio:
 * - Hover / micro-interactions: DUR_MICRO + SPRING_UI
 * - Element entrances: DUR_ENTER + EASE_ENTER
 * - Scene transitions: DUR_SCENE + EASE_ENTER
 * - Exits: EASE_EXIT
 * - Scroll: Scrubbed linear mapping
 */

export const EASE_ENTER = [0.16, 1, 0.3, 1] as const;
export const EASE_EXIT = [0.32, 0.72, 0, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

export const SPRING_UI = {
  type: "spring",
  stiffness: 400,
  damping: 30,
  mass: 0.8,
} as const;

export const SPRING_LAYOUT = {
  type: "spring",
  stiffness: 260,
  damping: 34,
} as const;

export const SPRING_FLOAT = {
  type: "spring",
  stiffness: 120,
  damping: 20,
  mass: 0.5,
} as const;

export const SPRING_BOUNCE_SUBTLE = {
  type: "spring",
  stiffness: 300,
  damping: 22,
} as const;

export const DUR_MICRO = 0.16; // 160ms for hover & tap feedback
export const DUR_ENTER = 0.65; // 650ms for card and element reveals
export const DUR_SCENE = 0.95; // 950ms for major headline and scene transitions

export const DIST_TEXT = 32; // px travel for slide-in text
export const DIST_MASK = "110%"; // percentage travel for overflow-hidden line masks
export const STAGGER_CHILD = 0.06; // 60ms between list/grid children
export const STAGGER_LINE = 0.085; // 85ms between headline lines
export const BLUR_ENTER = "8px"; // initial blur on entrance
