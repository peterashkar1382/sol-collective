/**
 * Ranking Factors
 * Defines the components used to calculate FeedItem scores
 */

export interface RankingFactors {
  /** Event severity (0-5) - higher severity = higher score */
  severity: number;

  /** Recency weight (0-1) - how recent the event is */
  recency: number;

  /** Local relevance (0-1) - how close/relevant to user location */
  localRelevance: number;

  /** Media count - number of attachments (images, videos, etc) */
  mediaCount: number;

  /** Engagement metric (0-1) - comments, views, shares, etc */
  engagement: number;

  /** AI confidence (0-1) - confidence score from AI models */
  aiConfidence: number;
}

/**
 * Ranking configuration with weights for each factor
 */
export interface RankingConfig {
  /** Weight for severity (default: 0.2) */
  severityWeight?: number;

  /** Weight for recency (default: 0.25) */
  recencyWeight?: number;

  /** Weight for local relevance (default: 0.2) */
  localRelevanceWeight?: number;

  /** Weight for media count (default: 0.1) */
  mediaCountWeight?: number;

  /** Weight for engagement (default: 0.15) */
  engagementWeight?: number;

  /** Weight for AI confidence (default: 0.1) */
  aiConfidenceWeight?: number;
}
