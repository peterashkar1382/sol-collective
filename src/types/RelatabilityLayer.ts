/**
 * Relatability Layer
 * Turns abstract space weather concepts into personal, relevant impacts
 * This is the core engagement mechanism that builds retention
 */

export type ImpactCategory =
  | "gps"
  | "aurora"
  | "aviation"
  | "radio"
  | "power"
  | "satellite"
  | "telecommunications"
  | "other";

/**
 * Individual impact scenario
 * Explains how a phenomenon affects something the user cares about
 */
export interface ImpactScenario {
  /** Category of impact */
  category: ImpactCategory;

  /** Short, personal description of the impact */
  description: string;

  /** Who this affects (e.g., "pilots", "farmers with GPS", "northern hemisphere residents") */
  affectedGroup: string;

  /** Severity indicator - how likely and how serious */
  severity: "low" | "moderate" | "high";

  /** Emoji or icon for quick visual recognition */
  icon?: string;
}

/**
 * Geographic context for personalized relatability
 */
export interface GeographicContext {
  /** Latitude of the user's location */
  latitude?: number;

  /** Longitude of the user's location */
  longitude?: number;

  /** Region name (e.g., "Canada", "Northern Europe", "Australia") */
  region?: string;

  /** Whether location is in high-latitude (aurora visible) zones */
  isHighLatitude?: boolean;
}

/**
 * User interests that personalize relatability
 */
export interface UserInterests {
  /** User's professional/hobby interests */
  interests: string[]; // e.g., ["astronomy", "aviation", "hiking", "photography"]

  /** User's critical systems (e.g., ["gps-dependent", "radio-user", "power-sensitive"]) */
  criticalSystems?: string[];
}

/**
 * The Relatability Engine output
 * Transforms abstract phenomenon into personal relevance
 */
export interface RelatabilityLayer {
  /** Primary hook - the single most relevant reason to care */
  whyYouShouldCare: string;

  /** Array of specific impact scenarios */
  impactScenarios: ImpactScenario[];

  /** Geographic personalization context */
  geographic?: GeographicContext;

  /** Interest-based personalization */
  userInterests?: UserInterests;

  /** Personalized scenarios (subset of impactScenarios relevant to this user) */
  personalizedScenarios?: ImpactScenario[];

  /** Call-to-action for the user (e.g., "Check aurora forecast", "Download offline maps") */
  suggestedAction?: string;
}

/**
 * Example impact scenarios for different phenomena
 */
export const impactScenarioExamples = {
  gps: {
    category: "gps" as ImpactCategory,
    description: "Might affect your phone GPS accuracy by up to 10 meters",
    affectedGroup: "Anyone using GPS navigation",
    severity: "low" as const,
    icon: "📍",
  },

  aurora: {
    category: "aurora" as ImpactCategory,
    description: "Could make northern lights visible near you tonight",
    affectedGroup: "People in northern regions",
    severity: "low" as const,
    icon: "🌌",
  },

  aviation: {
    category: "aviation" as ImpactCategory,
    description: "May affect flight routes over polar regions and radiation exposure",
    affectedGroup: "Pilots and frequent flyers on polar routes",
    severity: "moderate" as const,
    icon: "✈️",
  },

  radio: {
    category: "radio" as ImpactCategory,
    description: "Can interfere with radio signals and ham radio communications",
    affectedGroup: "Radio operators and amateur astronomers",
    severity: "moderate" as const,
    icon: "📡",
  },

  power: {
    category: "power" as ImpactCategory,
    description: "Can cause voltage instability in power grids",
    affectedGroup: "Power utilities and large consumers",
    severity: "high" as const,
    icon: "⚡",
  },

  satellite: {
    category: "satellite" as ImpactCategory,
    description: "May temporarily affect satellite services",
    affectedGroup: "Satellite operators and users",
    severity: "moderate" as const,
    icon: "🛰️",
  },
};
