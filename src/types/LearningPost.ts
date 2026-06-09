/**
 * Learning Post
 * Educational content about space weather and solar phenomena
 * Designed for public engagement and scientific literacy
 */

import type { Media } from "./Media";

export type LearningTopic =
  | "sunspot"
  | "flare"
  | "aurora"
  | "magnetosphere"
  | "solar wind";

export type DifficultyLevel = 1 | 2 | 3; // 1 = beginner, 2 = intermediate, 3 = advanced

export interface LearningPost {
  /** Unique identifier for the learning post */
  id: string;

  /** Topic category */
  topic: LearningTopic;

  /** Post title */
  title: string;

  /** Attention-grabbing opening line or question */
  hook: string;

  /** Simple, accessible explanation for general audience */
  explanation_simple: string;

  /** Optional: In-depth scientific explanation for advanced learners */
  explanation_scientific?: string;

  /** How this topic connects to real-world impacts and user experience */
  real_world_connection: string;

  /** Analogy or comparison to help understand the concept */
  analogy: string;

  /** Optional: Associated images, diagrams, or videos */
  visual?: Media[];

  /** Difficulty level: 1 (beginner), 2 (intermediate), 3 (advanced) */
  difficulty: DifficultyLevel;

  /** Tags for categorization and search */
  tags: string[];
}
