/**
 * AI Analysis and Predictions
 * AI-generated insights, summaries, and probabilistic models for events
 */

export interface AI {
  /** AI-generated summary of the event */
  summary?: string;

  /** Detailed explanation of why this event occurred or its mechanisms */
  explanation?: string;

  /** Predicted impact/consequences of this event */
  predictedImpact?: string;

  /** Probabilistic models and predictions */
  probabilityModels?: {
    /** Probability of aurora visibility (0-1) */
    auroraVisibility?: number;

    /** Estimated time until storm arrival (Unix timestamp or hours) */
    stormArrivalTime?: number;

    /** Add other probabilistic predictions as needed */
    [key: string]: number | undefined;
  };
}
