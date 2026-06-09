/**
 * Content Generation Pipeline
 * Automated flow from raw solar data to personalized feed items
 *
 * Flow:
 * Raw Solar Data
 *      ↓
 * Event Detection
 *      ↓
 * AI Digest (what happened)
 *      ↓
 * Learning Generator (what it means)
 *      ↓
 * Relatability Mapper (why it matters to YOU)
 *      ↓
 * Feed Item
 */

import type { RawEvent } from "../types/RawEvent";
import type { Event } from "../types/Event";
import type { EventDigest } from "../types/EventDigest";
import type { LearningPost } from "../types/LearningPost";
import type { RelatabilityLayer } from "../types/RelatabilityLayer";
import type { FeedItem } from "../types/FeedItem";

/**
 * Generic interface for any pipeline stage
 * Processors implement this to fit into the pipeline
 */
export interface PipelineStage<TInput, TOutput> {
  /** Stage name for logging and debugging */
  name: string;

  /** Process input and return output */
  process(input: TInput): Promise<TOutput>;

  /** Optional: validate input before processing */
  validate?(input: TInput): boolean;

  /** Optional: handle errors during processing */
  onError?(error: Error, input: TInput): Promise<TOutput | null>;
}

/**
 * Stage 1: Event Detection
 * Converts raw solar observation data into structured Event objects
 */
export interface EventDetector extends PipelineStage<RawEvent, Event> {
  name: "EventDetector";
  /** Identify event type, severity, and relevance */
  detectEventType(raw: RawEvent): Event["type"];
  calculateSeverity(raw: RawEvent): Event["severity"];
}

/**
 * Stage 2: Digest Generator
 * Creates human-friendly summaries (what happened)
 * Uses AI to generate plain-language explanations
 */
export interface DigestGenerator extends PipelineStage<Event, EventDigest> {
  name: "DigestGenerator";
  /** Generate attention-grabbing headline */
  generateHeadline(event: Event): string;
  /** Create plain-language summary */
  generatePlainLanguageSummary(event: Event): string;
  /** Create detailed explanation */
  generateWhatHappened(event: Event): string;
  /** Create impact explanation */
  generateWhatItMeans(event: Event): string;
}

/**
 * Stage 3: Learning Generator
 * Creates educational content (what it means conceptually)
 * Generates explanations at multiple difficulty levels
 */
export interface LearningGenerator extends PipelineStage<Event, LearningPost> {
  name: "LearningGenerator";
  /** Determine topic from event type */
  mapEventToTopic(event: Event): LearningPost["topic"];
  /** Create beginner-friendly explanation */
  generateSimpleExplanation(event: Event): string;
  /** Create advanced scientific explanation */
  generateScientificExplanation(event: Event): string;
  /** Connect to real-world applications */
  generateRealWorldConnection(event: Event): string;
  /** Create memorable analogy */
  generateAnalogy(event: Event): string;
}

/**
 * Stage 4: Relatability Mapper
 * Personalizes content by adding why-you-should-care context
 * Maps abstract concepts to personal impacts
 */
export interface RelatabilityMapper
  extends PipelineStage<LearningPost, RelatabilityLayer> {
  name: "RelatabilityMapper";
  /** Generate primary hook (why user should care) */
  generateWhyYouShouldCare(post: LearningPost): string;
  /** Identify relevant impact scenarios */
  selectRelevantScenarios(post: LearningPost): RelatabilityLayer["impactScenarios"];
  /** Generate personalized call-to-action */
  generateSuggestedAction(post: LearningPost): string;
}

/**
 * Stage 5: Feed Item Creator
 * Final stage - packages everything into a feed-ready item
 */
export interface FeedItemCreator
  extends PipelineStage<
    { event: Event; digest: EventDigest; learning: LearningPost; relatability: RelatabilityLayer },
    FeedItem
  > {
  name: "FeedItemCreator";
  /** Combine all components into cohesive feed item */
  synthesize(
    event: Event,
    digest: EventDigest,
    learning: LearningPost,
    relatability: RelatabilityLayer
  ): FeedItem;
}

/**
 * Main Content Pipeline Orchestrator
 * Coordinates all stages and manages the flow
 */
export class ContentPipeline {
  private stages: {
    eventDetector: EventDetector;
    digestGenerator: DigestGenerator;
    learningGenerator: LearningGenerator;
    relatabilityMapper: RelatabilityMapper;
    feedItemCreator: FeedItemCreator;
  };

  constructor(
    eventDetector: EventDetector,
    digestGenerator: DigestGenerator,
    learningGenerator: LearningGenerator,
    relatabilityMapper: RelatabilityMapper,
    feedItemCreator: FeedItemCreator
  ) {
    this.stages = {
      eventDetector,
      digestGenerator,
      learningGenerator,
      relatabilityMapper,
      feedItemCreator,
    };
  }

  /**
   * Process raw solar data through the entire pipeline
   * Returns a complete feed item ready for display
   */
  async process(rawData: RawEvent): Promise<FeedItem> {
    try {
      // Stage 1: Detect event
      const event = await this.stages.eventDetector.process(rawData);

      // Stage 2: Generate digest
      const digest = await this.stages.digestGenerator.process(event);

      // Stage 3: Generate learning content
      const learning = await this.stages.learningGenerator.process(event);

      // Stage 4: Add relatability layer
      const relatability = await this.stages.relatabilityMapper.process(learning);

      // Stage 5: Create feed item
      const feedItem = await this.stages.feedItemCreator.process({
        event,
        digest,
        learning,
        relatability,
      });

      return feedItem;
    } catch (error) {
      throw new Error(
        `Content pipeline failed: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  }

  /**
   * Process multiple raw events in parallel
   */
  async processBatch(rawDataArray: RawEvent[]): Promise<FeedItem[]> {
    return Promise.all(rawDataArray.map((raw) => this.process(raw)));
  }

  /**
   * Get pipeline status (which stages are ready)
   */
  getStatus(): {
    eventDetector: boolean;
    digestGenerator: boolean;
    learningGenerator: boolean;
    relatabilityMapper: boolean;
    feedItemCreator: boolean;
  } {
    return {
      eventDetector: !!this.stages.eventDetector,
      digestGenerator: !!this.stages.digestGenerator,
      learningGenerator: !!this.stages.learningGenerator,
      relatabilityMapper: !!this.stages.relatabilityMapper,
      feedItemCreator: !!this.stages.feedItemCreator,
    };
  }
}

/**
 * Pipeline builder for easy construction
 */
export class ContentPipelineBuilder {
  private eventDetector?: EventDetector;
  private digestGenerator?: DigestGenerator;
  private learningGenerator?: LearningGenerator;
  private relatabilityMapper?: RelatabilityMapper;
  private feedItemCreator?: FeedItemCreator;

  withEventDetector(detector: EventDetector): this {
    this.eventDetector = detector;
    return this;
  }

  withDigestGenerator(generator: DigestGenerator): this {
    this.digestGenerator = generator;
    return this;
  }

  withLearningGenerator(generator: LearningGenerator): this {
    this.learningGenerator = generator;
    return this;
  }

  withRelatabilityMapper(mapper: RelatabilityMapper): this {
    this.relatabilityMapper = mapper;
    return this;
  }

  withFeedItemCreator(creator: FeedItemCreator): this {
    this.feedItemCreator = creator;
    return this;
  }

  build(): ContentPipeline {
    if (
      !this.eventDetector ||
      !this.digestGenerator ||
      !this.learningGenerator ||
      !this.relatabilityMapper ||
      !this.feedItemCreator
    ) {
      throw new Error("All pipeline stages must be configured before building");
    }

    return new ContentPipeline(
      this.eventDetector,
      this.digestGenerator,
      this.learningGenerator,
      this.relatabilityMapper,
      this.feedItemCreator
    );
  }
}
