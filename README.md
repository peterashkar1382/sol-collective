# Sol Collective

A multi-source event tracking and management system for environmental, space, and disaster events.

## Overview

Sol Collective aggregates real-time event data from multiple sources including:
- **NASA** - Space weather, solar events, asteroids
- **NOAA** - Weather events, storms, flooding
- **ESA** - European space observations
- **User submissions** - Community-reported events and observations
- **AI predictions** - Machine learning-based forecasts and alerts
- **System data** - Internal monitoring and metrics

## Features

- 🌍 **Geospatial tracking** - Real-time location-based event monitoring
- 📊 **Multi-source integration** - Aggregates data from NASA, NOAA, ESA, and community sources
- 🤖 **AI intelligence** - Confidence scores for predictive events and AI-derived alerts
- 🔐 **Access control** - Public, regional, and private visibility levels
- 🏷️ **Flexible tagging** - Categorize and search events easily
- 📈 **Event lifecycle** - Track events from active through resolution
- ☀️ **Solar monitoring** - Space weather and Earth impact tracking
- 🌤️ **Weather context** - Real-time atmospheric conditions
- 👥 **Community-driven** - User photos, videos, and reports

## Event Categories

### Solar Events
- `SOLAR_FLARE` - Solar flare activity
- `CME` - Coronal Mass Ejection
- `SOLAR_WIND_SPIKE` - Solar wind anomalies
- `SUNSPOT_REGION` - Active sunspot regions
- `GEOMAGNETIC_STORM` - Geomagnetic disturbances

### Earth Impact Events
- `AURORA_FORECAST` - Predicted aurora activity
- `AURORA_SIGHTING` - Observed aurora events
- `IONOSPHERIC_DISTURBANCE` - Upper atmosphere disturbances

### Weather Context
- `CLOUD_COVER_UPDATE` - Cloud coverage changes
- `SKY_CONDITION` - General sky conditions

### Community Events
- `USER_PHOTO` - User-submitted photos
- `USER_VIDEO` - User-submitted videos
- `USER_REPORT` - User reports and observations
- `DISCUSSION_POST` - Community discussions

### AI Events
- `AI_SUMMARY` - Automated event summaries
- `AI_FORECAST` - AI-generated forecasts
- `AI_ALERT` - AI-triggered alerts

## Event Structure

```typescript
Event {
  id: string
  type: EventType (controlled vocabulary)
  title: string
  description: string | null
  timestamp: number
  updatedAt: number
  source: "nasa" | "noaa" | "esa" | "user" | "ai" | "system"
  severity: number // 0–5 (none → extreme)
  location?: { lat: number, lon: number, name?: string }
  tags: string[]
  visibility: "public" | "regional" | "private"
  status: "active" | "ongoing" | "resolved"
  confidence: number // 0–1
}
```

## Getting Started

### Installation

```bash
npm install
```

### Build

```bash
npm run build
```

### Development

```bash
npm run dev
```

### Run Tests

```bash
npm test
```

## Usage

```typescript
import { EventManager, SOLAR_EVENTS, COMMUNITY_EVENTS } from "./index";

const manager = new EventManager();

// Create a solar event
const solarEvent = {
  id: "evt_001",
  type: SOLAR_EVENTS.CME,
  title: "Major CME Event Detected",
  description: "Significant coronal mass ejection from the Sun",
  timestamp: Date.now(),
  updatedAt: Date.now(),
  source: "nasa" as const,
  severity: 4,
  location: { lat: 0, lon: 0, name: "Solar Region" },
  tags: ["solar", "cme", "nasa"],
  visibility: "public" as const,
  status: "active" as const,
  confidence: 0.98,
};

manager.addEvent(solarEvent);

// Query events
const activeEvents = manager.getEventsByStatus("active");
const solarEvents = manager.getEventsByType(SOLAR_EVENTS.CME);
const nasaEvents = manager.getEventsBySource("nasa");
const nearbyEvents = manager.getEventsByLocation(34.0522, -118.2437, 100); // 100km radius

// Get statistics
const stats = manager.getStatistics();
console.log(stats);
```

## Project Structure

```
sol-collective/
├── src/
│   ├── types/
│   │   ├── EventType.ts      # Event types (controlled vocabulary)
│   │   └── Event.ts          # Event interface and types
│   └── index.ts              # Main entry point and EventManager
├── dist/                     # Compiled JavaScript output
├── package.json
├── tsconfig.json
├── .gitignore
└── README.md
```

## Design Decisions

### Controlled Vocabulary
Event types use a predefined, categorized list to ensure consistency and prevent chaos as the system scales.

### Source Tracking
Every event records its origin (NASA, NOAA, ESA, user, AI, or system) to provide traceability and filtering.

### Confidence Scores
Particularly important for AI-generated events, confidence scores (0-1) allow consumers to assess reliability.

### Geographic Context
Optional location data (lat/lon/name) enables spatial analysis and region-specific filtering.

### Visibility Control
Events can be marked as public, regional, or private to control access and distribution.

## License

MIT

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.
