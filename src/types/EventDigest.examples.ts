/**
 * Example Event Digests
 * Real-world examples showing how events are transformed into user-friendly summaries
 */

import type { EventDigest } from "./EventDigest";

/**
 * Example 1: Strong CME Event (Severity 4)
 * Type: CME (Coronal Mass Ejection)
 * Severity: 4/5 (High)
 *
 * This demonstrates a high-impact solar eruption with geomagnetic storm potential.
 */
export const exampleCMEDigest: EventDigest = {
  headline: "Strong solar eruption headed toward Earth",

  plainLanguageSummary:
    "A fast-moving burst of charged solar material was released from the Sun.",

  whatHappened:
    "A coronal mass ejection (CME) erupted from an active region on the Sun, " +
    "accelerating to approximately 1,200 km/s. The plasma cloud is currently " +
    "propagating toward Earth and is expected to reach our planet's magnetosphere " +
    "within the next 1-2 days.",

  whatItMeans:
    "This may cause geomagnetic storms and visible auroras in northern regions. " +
    "Power grid operators and satellite operators should prepare for potential impacts. " +
    "The aurora may be visible from higher latitudes, and radio communications could " +
    "experience temporary disruptions.",

  whoCanSeeIt: "Canada, Alaska, Northern Europe",

  impactLevel: "high",

  timing: {
    started: 1717862400000, // 2026-06-09T00:00:00Z (example)
    peak: 1717900800000, // ~36-48 hours later
    expectedEnd: 1717939200000, // ~48-72 hours total duration
  },

  probabilityUpdates: {
    auroraChance: 0.72,
    stormArrival: "~36–48 hours",
  },

  relatedEvents: [],
};

/**
 * Example 2: Moderate Solar Flare (Severity 2)
 * Type: Solar Flare (M-class)
 * Severity: 2/5 (Low-Moderate)
 *
 * This demonstrates a moderate event with minimal user impact.
 */
export const exampleFlareDigest: EventDigest = {
  headline: "Moderate solar flare detected",

  plainLanguageSummary:
    "A medium-sized solar flare was observed from the Sun's surface.",

  whatHappened:
    "An M-class solar flare was detected originating from solar active region AR3181. " +
    "The flare peaked at 14:32 UTC and produced moderate X-ray emissions. No significant " +
    "particle acceleration was observed.",

  whatItMeans:
    "This flare poses minimal risk to the general public. Aviation crews at polar routes " +
    "may experience a slight increase in radiation exposure, but levels remain within " +
    "acceptable limits. Some high-frequency radio communications may experience brief " +
    "disruptions.",

  whoCanSeeIt: "Polar regions (aviation impact only)",

  impactLevel: "low",

  timing: {
    started: 1717862400000,
    peak: 1717866000000, // ~1 hour after start
    expectedEnd: 1717869600000, // ~2 hours duration
  },

  probabilityUpdates: {
    auroraChance: 0.15,
    stormArrival: "N/A",
  },

  relatedEvents: [],
};

/**
 * Example 3: Extreme Geomagnetic Storm (Severity 5)
 * Type: Geomagnetic Storm (G5 level)
 * Severity: 5/5 (Extreme)
 *
 * This demonstrates a severe space weather event with widespread impacts.
 */
export const exampleGeomagnetsStormDigest: EventDigest = {
  headline: "Extreme geomagnetic storm warning",

  plainLanguageSummary:
    "A severe geomagnetic storm is affecting Earth's magnetic field.",

  whatHappened:
    "Following a powerful CME impact, Earth's magnetosphere is experiencing an " +
    "extreme geomagnetic storm (G5 level). The Kp index has reached 9, and strong " +
    "auroras are visible at lower latitudes than usual.",

  whatItMeans:
    "This is a severe space weather event. Power grids in affected regions may experience " +
    "voltage instability. Transformers and electrical infrastructure are at risk. " +
    "Satellite operations face significant challenges. The aurora is visible across " +
    "much of the northern and southern hemispheres. GPS and navigation systems may be " +
    "unreliable.",

  whoCanSeeIt: "Worldwide (aurora visible at mid-latitudes)",

  impactLevel: "extreme",

  timing: {
    started: 1717862400000,
    peak: 1717900800000, // Peak storm intensity
    expectedEnd: 1717939200000, // 2-3 days duration expected
  },

  probabilityUpdates: {
    auroraChance: 0.99,
    stormArrival: "NOW (ongoing)",
  },

  relatedEvents: [
    "event-cme-001", // Related CME that triggered this storm
    "event-flare-002", // Associated solar flare
  ],
};
