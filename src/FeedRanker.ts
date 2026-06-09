/**
 * Feed Ranker
 * Implements the trending algorithm for ranking events in personalized feeds
 */

import type { Event } from "./types/Event";
import type { FeedItem } from "./types/FeedItem";
import type { RankingConfig, RankingFactors } from "./types/Ranking";

export class FeedRanker {
  private config: Required<RankingConfig>;

  constructor(config?: RankingConfig) {
    // Default weights sum to 1.0
    this.config = {
      severityWeight: config?.severityWeight ?? 0.2,
      recencyWeight: config?.recencyWeight ?? 0.25,
      localRelevanceWeight: config?.localRelevanceWeight ?? 0.2,
      mediaCountWeight: config?.mediaCountWeight ?? 0.1,
      engagementWeight: config?.engagementWeight ?? 0.15,
      aiConfidenceWeight: config?.aiConfidenceWeight ?? 0.1,
    };
  }

  /**
   * Calculate ranking factors for an event
   */
  private calculateFactors(
    event: Event,
    userLat?: number,
    userLon?: number,
    engagement?: number
  ): RankingFactors {
    // Severity factor: normalize 0-5 to 0-1
    const severity = Math.min(event.severity / 5, 1);

    // Recency factor: events older than 30 days = 0, recent = 1
    const ageMs = Date.now() - event.timestamp;
    const ageDays = ageMs / (1000 * 60 * 60 * 24);
    const recency = Math.max(0, 1 - ageDays / 30);

    // Local relevance: distance-based scoring
    let localRelevance = 0;
    if (userLat !== undefined && userLon !== undefined && event.location) {
      const distance = Math.sqrt(
        Math.pow(event.location.lat - userLat, 2) +
          Math.pow(event.location.lon - userLon, 2)
      );
      // Within 100km = high relevance, decays with distance
      localRelevance = Math.max(0, 1 - distance / 10);
    }

    // Media count factor: normalize to 0-1 (assuming 5+ media = max)
    const mediaCount = Math.min((event.media?.length ?? 0) / 5, 1);

    // Engagement factor: user-provided or default to 0
    const engagementScore = engagement ?? 0;

    // AI confidence: use event confidence score directly
    const aiConfidence = event.confidence;

    return {
      severity,
      recency,
      localRelevance,
      mediaCount,
      engagement: engagementScore,
      aiConfidence,
    };
  }

  /**
   * Calculate ranking score for an event (0-1)
   */
  rankEvent(
    event: Event,
    userLat?: number,
    userLon?: number,
    engagement?: number
  ): number {
    const factors = this.calculateFactors(event, userLat, userLon, engagement);

    const score =
      factors.severity * this.config.severityWeight +
      factors.recency * this.config.recencyWeight +
      factors.localRelevance * this.config.localRelevanceWeight +
      factors.mediaCount * this.config.mediaCountWeight +
      factors.engagement * this.config.engagementWeight +
      factors.aiConfidence * this.config.aiConfidenceWeight;

    return Math.min(score, 1);
  }

  /**
   * Generate human-readable reasons why an event is ranked high
   */
  generateReasons(
    event: Event,
    score: number,
    userLat?: number,
    userLon?: number
  ): string[] {
    const reasons: string[] = [];
    const factors = this.calculateFactors(event, userLat, userLon, 0);

    // Add reasons based on factor strength
    if (factors.severity > 0.6) {
      reasons.push(`High severity (${event.severity}/5)`);
    }

    if (factors.recency > 0.8) {
      reasons.push("Recently reported");
    } else if (factors.recency > 0.5) {
      reasons.push("Active event");
    }

    if (factors.localRelevance > 0.6) {
      reasons.push("Near you");
    }

    if (factors.mediaCount > 0.4) {
      reasons.push(`${event.media?.length ?? 0} media attachments`);
    }

    if (factors.aiConfidence > 0.9) {
      reasons.push("High confidence prediction");
    } else if (factors.aiConfidence > 0.7) {
      reasons.push("AI forecast");
    }

    if (reasons.length === 0) {
      reasons.push("Trending");
    }

    return reasons;
  }

  /**
   * Rank multiple events and return as FeedItems
   */
  rankEvents(
    events: Event[],
    userLat?: number,
    userLon?: number,
    engagementMap?: Map<string, number>
  ): FeedItem[] {
    return events
      .map((event) => {
        const engagement = engagementMap?.get(event.id) ?? 0;
        const score = this.rankEvent(event, userLat, userLon, engagement);
        const reasons = this.generateReasons(event, score, userLat, userLon);

        return {
          event,
          score,
          reasons,
        };
      })
      .sort((a, b) => b.score - a.score); // Sort by score descending
  }
}
