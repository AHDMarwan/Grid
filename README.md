# Grid

Grid is a local-first mobile application for teachers to track classroom follow-up criteria with minimal interaction during each lesson.

## Current milestone: UI foundation

The current branch contains a React Native / Expo / TypeScript UI prototype with mock data. It includes:

- Arabic RTL home screen with assigned classes.
- Class details and recent sessions.
- New session evaluation flow.
- Five criteria scored from 0 to 3: participation, punctuality, homework, behavior and notebook.
- Independent absence state that is not treated as score 0.
- Default score action for the whole class.
- Period results preview.
- Settings placeholders for Massar import and local backup.

Persistence is intentionally not implemented in this milestone. SQLite and Massar import are the next phase.

## Stack

- React Native
- Expo SDK 57
- Expo Router
- TypeScript

The Expo SDK 57 dependency versions follow the current official Expo default template.

## Run locally

```bash
npm install
npm run start
```

Then open the project on Android through an emulator/development build or another Expo-supported workflow.
