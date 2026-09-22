# To-do App

This project is a simple mobile to-do list app built with Expo and React Native. It lets you add tasks to a list, view them on screen, and remove items when they are finished or no longer needed.

The app is intentionally lightweight and easy to use, making it a good starting point for a task tracker or shopping list.

## What the app does

This app includes:

- A text input for entering a new item
- An Add Item button to save it to the list
- A scrollable list of tasks/items
- A Delete button beside each item to remove it
- A clean mobile-friendly layout for quick task management

It is useful for:

- Daily to-do lists
- Grocery or shopping lists
- Quick reminders for chores and errands
- Learning the basics of Expo + React Native app development

## App stack

- Expo
- React Native
- TypeScript
- Expo Router

## Requirements

Before you run the app, install the following on your computer:

1. Node.js LTS
   - Download from: https://nodejs.org/
   - Recommended: Node 20 or newer

2. npm
   - This usually comes with Node.js

3. Git (optional but helpful)
   - Download from: https://git-scm.com/

4. A mobile device or emulator
   - To run on your phone: install Expo Go from the App Store or Google Play
   - For Android emulation: install Android Studio and an Android emulator if needed

## Install the project

From the project folder, run:

```bash
npm install
```

This installs all dependencies needed to run the app.

## Run the app

Start the Expo development server:

```bash
npm start
```

or:

```bash
npx expo start
```

You should see a QR code in the terminal and a Metro bundler interface.

## Run it on your phone

To use the app on a real phone:

1. Install Expo Go on your phone.
2. Make sure your phone and your computer are on the same Wi-Fi network.
3. In the terminal, start the app with:

   ```bash
   npm start
   ```

4. Scan the QR code shown in the terminal with your phone camera or the Expo Go app.
5. Expo Go will open the project automatically.

If the QR code does not load, try:

- restarting the Metro server
- checking that your phone and computer are on the same network
- making sure your firewall is not blocking local connections

## Useful commands

```bash
npm start
```

Starts the Expo app.

```bash
npx expo start --android
```

Starts the app in an Android emulator if one is configured.

```bash
npx expo start --ios
```

Starts the app in an iOS simulator if you are using a Mac.

```bash
npm run lint
```

Runs the project linter.

## Project structure

```text
.
├── app.json
├── package.json
├── src/
│   └── app/
│       └── index.tsx
├── assets/
├── README.md
└── ...
```

The main app logic lives in the screen component inside:

- `src/app/index.tsx`

## Notes

This is a basic app that demonstrates how to build a simple mobile interface with React Native and Expo. It is a good place to extend with features like:

- editing existing tasks
- marking tasks complete
- storing items in local storage
- adding categories or priorities
- syncing with a backend

## Troubleshooting

If the app does not start:

- run `npm install` again
- verify that Node.js is installed correctly
- make sure the Expo server is running in the project folder
- confirm your phone is connected to the same network for QR-based testing

## License

This project is licensed under the terms in the repository license file.
