# Personal Notes App

A lightweight mobile-first notes application built with Expo and Firebase. The app lets users create, view, edit, delete, and favorite personal notes while keeping everything in sync through Firestore.

## Overview

This project is designed as a simple daily note-taking app for personal organization. Users sign in with an email/password account and manage their own notes from a clean, modern interface. It is built to work across Android, iOS, and the web with Expo, using Firebase Authentication and Firestore for secure, cloud-based storage.

## Key Features

- Email/password authentication with Firebase Auth
- Create, update, and delete notes
- Favorite and unfavorite notes
- Filter notes between all notes and favorites
- Real-time syncing with Firestore
- Mobile-first UI with light and dark theme support
- Cross-platform app experience with Expo and React Native

## Tech Stack

- Expo
- React Native
- TypeScript
- Expo Router
- Firebase Authentication
- Firestore

## Project Structure

```text
personal-notes/
├── src/
│   ├── app/                  # App screens and routing
│   ├── components/           # Reusable UI components
│   ├── constants/            # Theme and shared styling values
│   ├── firebase/             # Firebase initialization
│   ├── hooks/                # Theme and color scheme hooks
│   ├── services/             # Note CRUD and subscription logic
│   └── global.css            # Global styling for web
├── app.json                  # Expo app configuration
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript config
├── README.md                 # Project overview and setup
├── LICENSE                   # License information
├── assets/                   # App assets and icons
├── scripts/                  # Utility scripts
└── expo-env.d.ts             # Expo TypeScript environment file
```

## How it works

1. A user signs in or creates an account with Firebase authentication.
2. After authentication, the app subscribes to that user's notes in Firestore.
3. Notes appear in a list where users can filter favorites.
4. Users can create, edit, or delete notes, and changes are saved immediately.
5. Firestore snapshots keep the interface in sync in real time.

## Getting Started

### Prerequisites

- Node.js 18+
- npm or bun
- Expo CLI or the Expo mobile app
- A Firebase project with Authentication and Firestore enabled

### Install dependencies

```bash
npm install
```

### Start the app

```bash
npx expo start
```

Then open the app in:

- an Android emulator
- an iOS simulator
- Expo Go on a mobile device
- the browser with Expo web support

## Firebase Setup

This project is already wired to Firebase, but it should be customized for your own project.

1. Create a Firebase project in the Firebase Console.
2. Enable:
   - Email/Password authentication
   - Firestore Database
3. Update the Firebase config inside `src/firebase/firebaseConfig.ts` with your own project values.
4. Make sure your Firestore rules allow authenticated users to manage only their own notes.

## Available Scripts

```bash
npm start
npm run android
npm run ios
npm run web
npm run lint
```

## Development Notes

- The app uses Expo Router for navigation.
- Authentication state drives the experience: signed-out users see the login form, and signed-in users see their notes dashboard.
- Notes are scoped by `userId`, ensuring users only see their own data.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Potential Improvements

Possible enhancements include:

- note search and sorting
- tag and category organization
- rich text editing
- offline storage support
- password reset and profile tools
- cloud sync improvements
