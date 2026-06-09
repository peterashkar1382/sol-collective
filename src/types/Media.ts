/**
 * Media attachment types for events
 */
export type MediaType = "image" | "video" | "link" | "livestream";

/**
 * Media provider/platform
 */
export type MediaProvider = "youtube" | "tiktok" | "instagram" | "upload";

/**
 * Author information for media
 */
export interface MediaAuthor {
  name: string;
  id: string;
}

/**
 * Media attachment for events
 * Represents images, videos, links, and livestreams associated with events
 */
export interface Media {
  /** Type of media content */
  type: MediaType;

  /** URL to the media resource */
  url: string;

  /** Thumbnail image URL (optional, for videos and livestreams) */
  thumbnail?: string;

  /** Platform where the media is hosted */
  provider?: MediaProvider;

  /** Author/creator of the media */
  author?: MediaAuthor;

  /** Unix timestamp when media was captured/created */
  capturedAt?: number;

  /** Geographic location where media was captured (optional) */
  location?: {
    lat: number;
    lon: number;
  };
}
