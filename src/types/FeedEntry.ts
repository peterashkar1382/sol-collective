/**
 * Feed Entry
 * Unified type for all content in the mixed-layer feed
 * Can be a live event, community post, or learning post
 */

import type { Event } from "./Event";
import type { FeedItem } from "./FeedItem";
import type { LearningPost } from "./LearningPost";

export type FeedEntryType = "event" | "community" | "learning";

/**
 * Unified feed entry that can hold any content type
 * Used to create the mixed-layer feed experience
 */
export interface FeedEntry {
  /** Unique identifier for this feed entry */
  id: string;

  /** Type of content in this feed entry */
  type: FeedEntryType;

  /** Unix timestamp when this entry was added to the feed */
  timestamp: number;

  /** Engagement score for ranking/sorting (views, likes, comments, shares) */
  engagementScore: number;

  /** The actual content - one of the three types */
  content: Event | FeedItem | LearningPost;
}

/**
 * Type guard to check if content is an Event
 */
export function isEvent(content: Event | FeedItem | LearningPost): content is Event {
  return "type" in content && "severity" in content && "metrics" in content;
}

/**
 * Type guard to check if content is a FeedItem (community post)
 */
export function isFeedItem(
  content: Event | FeedItem | LearningPost
): content is FeedItem {
  return "author" in content && "likes" in content && "comments" in content;
}

/**
 * Type guard to check if content is a LearningPost
 */
export function isLearningPost(
  content: Event | FeedItem | LearningPost
): content is LearningPost {
  return (
    "topic" in content &&
    "explanation_simple" in content &&
    "difficulty" in content
  );
}
