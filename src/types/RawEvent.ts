/**
 * Raw Event
 * Untouched scientific data from external sources (NASA, NOAA, ESA, etc)
 * Serves as the source for enriched Event objects
 */

import type { EventSource } from "./Event";

export interface RawEvent {
  /** Unique identifier for the raw event */
  id: string;

  /** Source of the raw data (nasa, noaa, esa, etc) */
  source: EventSource;

  /** Unix timestamp when data was received */
  timestamp: number;

  /** Untouched scientific payload from the source */
  payload: Record<string, any>;
}
