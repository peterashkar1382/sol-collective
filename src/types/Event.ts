/**
 * Location information for events
 */
export interface Location {
  lat: number;
  lon: number;
  name?: string;
}

/**
 * Event source enumeration
 * Tracks where the event data originates from
 */
export type EventSource = "nasa" | "noaa" | "esa" | "user" | "ai" | "system";

/**
 * Event visibility control
 */
export type EventVisibility = "public" | "regional" | "private";

/**
 * Event status tracking
 */
export type EventStatus = "active" | "ongoing" | "resolved";

/**
 * Scientific metrics associated with an event
 */
export interface Metrics {
  /** Planetary K-index (geomagnetic activity) */
  kpIndex?: number;

  /** X-ray flux from the Sun (W/m²) */
  xrayFlux?: number;

  /** Solar wind speed (km/s) */
  solarWindSpeed?: number;

  /** Allow other metric values */
  [key: string]: number | undefined;
}

// Import EventType and EventRelations from separate modules
import type { EventType } from "./EventType";
import type { EventRelations } from "./EventRelations";

/**
 * Main Event interface
 * Represents a tracked event in the sol-collective system
 */
export interface Event {
  /** Unique identifier for the event */
  id: string;

  /** Type/category of the event - controlled vocabulary */
  type: EventType;

  /** Event title/name */
  title: string;

  /** Detailed description of the event */
  description: string | null;

  /** Unix timestamp when event was created/detected */
  timestamp: number;

  /** Unix timestamp of last update */
  updatedAt: number;

  /** Source of the event data */
  source: EventSource;

  /** Severity level from 0 (none) to 5 (extreme) */
  severity: number;

  /** Geographic location of the event (optional) */
  location?: Location;

  /** Array of tags for categorization and search */
  tags: string[];

  /** Access control level for the event */
  visibility: EventVisibility;

  /** Current status of the event */
  status: EventStatus;

  /** Confidence score from 0 (low) to 1 (high) - important for AI predictions */
  confidence: number;

  /** Relationships to other events */
  relations: EventRelations;

  /** Scientific metrics (kpIndex, xrayFlux, solarWindSpeed, etc) */
  metrics?: Metrics;
}

// Re-export types for convenience
export type { EventType } from "./EventType";
export type { EventRelations } from "./EventRelations";
