/**
 * Event Digest
 * Human-friendly summary of an event for non-technical users
 * Provides plain language explanations, impact assessment, and timing info
 */

export interface EventDigestTiming {
  /** Unix timestamp when the event started */
  started: number;

  /** Unix timestamp of peak intensity/impact */
  peak: number;

  /** Unix timestamp of expected end */
  expectedEnd: number;
}

export interface ProbabilityUpdates {
  /** Probability of aurora visibility (0-1) */
  auroraChance: number;

  /** Expected time of storm arrival (ISO string or human readable) */
  stormArrival: string;
}

export type ImpactLevel = "none" | "low" | "moderate" | "high" | "extreme";

export interface EventDigest {
  /** Short headline for the event */
  headline: string;

  /** One-sentence summary accessible to general public */
  plainLanguageSummary: string;

  /** Detailed explanation of what happened */
  whatHappened: string;

  /** Explanation of what this means for people */
  whatItMeans: string;

  /** Geographic region affected (e.g., "Canada", "Northern Hemisphere", "Worldwide") */
  whoCanSeeIt: string;

  /** Impact level assessment */
  impactLevel: ImpactLevel;

  /** Event timing information */
  timing: EventDigestTiming;

  /** Optional: Probability updates and forecasts */
  probabilityUpdates?: ProbabilityUpdates;

  /** Array of related event IDs for context */
  relatedEvents: string[];
}
