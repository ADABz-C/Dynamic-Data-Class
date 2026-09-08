# Profile Card App

This project is a React Native mobile app built with Expo for Homework 2. It creates a simple profile card that introduces the core React Native components and styling system.

The app displays:

- A profile picture using `Image`
- A full name using `Text`
- A short bio or tagline using `Text`
- 2–3 fun facts displayed in a styled list
- A centered layout using Flexbox
- A card with background color, spacing, and rounded corners

## Project purpose

This assignment helps students practice:

- Using `View`, `Text`, and `Image` components
- Applying `StyleSheet` for consistent styling
- Using Flexbox to center and align content
- Creating a clean mobile card layout
- Publishing code to GitHub and submitting a project link

## Requirements covered

This app includes the required items from the assignment:

- A profile photo
- Full name
- Short bio/tagline
- Fun fact list
- Centered card layout
- Background color and spacing
- Rounded corner styling

## Prerequisites

Before you run the app, make sure you have the following installed:

- [Node.js LTS](https://nodejs.org/)
- npm (included with Node.js)
- [Expo Go](https://expo.dev/go) on your phone
- A phone and computer connected to the same Wi-Fi network for testing

## Install and run the app

1. Open a terminal in the project folder.

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the Expo development server:

   ```bash
   npx expo start
   ```

4. Open the Expo Go app on your phone.

5. Scan the QR code shown in the terminal.

6. Wait for the app to load. The profile card should appear on your phone.

## Running on Android or iOS emulator

You can also run the project in an emulator if you have one set up:

```bash
npm run android
```

For iOS (requires macOS):

```bash
npm run ios
```

## Common commands

```bash
npm start
npx expo start
npm run web
npm run lint
```

## Troubleshooting

If the app does not load on your phone:

- Make sure both devices are on the same Wi-Fi network
- Restart the Expo server with:

  ```bash
  npx expo start --tunnel
  ```

- Ensure the phone has the latest version of Expo Go

## App structure

```text
ProfileCard/
├── app/
│   ├── (tabs)
│   │   └── index.tsx
├── assets/
├── package.json
├── app.json
├── tsconfig.json
├── README.md
└── .gitignore
```

## Notes

This app is a basic profile card project and can be customized by editing the layout and styles in:

- `app/(tabs)/index.tsx`

Use this file to change the name, bio, fun facts, image, colors, and spacing.
