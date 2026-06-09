/**
 * Event Relations
 * Defines relationships between events (parent-child, related, derived)
 */
export interface EventRelations {
  /** ID of the parent event (for sub-events or follow-ups) */
  parentEventId?: string;

  /** Array of related event IDs (correlated or contextual) */
  relatedEventIds: string[];

  /** ID of the event this was AI-generated from (for derived events) */
  derivedFrom?: string;
}
