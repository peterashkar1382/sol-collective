/**
 * Feed Item
 * Represents an event as it appears in a personalized feed with ranking/scoring
 */

import type { Event } from "./Event";

export interface FeedItem {
  /** The event being displayed */
  event: Event;

  /** Trending/relevance score (0-1) used to rank in feed */
  score: number;

  /** Human-readable reasons why this event is shown (for UI display) */
  reasons: string[];
}
