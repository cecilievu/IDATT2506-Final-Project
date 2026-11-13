# IDATT2506-Final-Project
Cross-platform Christmas-themed hangman game with Norwegian and English language support. The game is developed using Ionic React, TypeScript, HTML/CSS and Capacitor. 

## Features
* Christmas-themed user interface
* Instructions displayed when opening the app for the first time, and accessible during gameplay
* Support for Norwegian and English
* Separate word lists for each language
* Interactive keyboard for guessing letters
* Win streak tracking

## Screenshots of the game

<img width="250" height="auto" alt="Start screen" src="https://github.com/user-attachments/assets/254f02c9-6d20-4efb-ac0f-912fb89ed39f" />
<img width="250" height="auto" alt="Start screen english" src="https://github.com/user-attachments/assets/d44b5842-e5f6-4d69-ba38-a3d62e1269e6" />
<img width="250" height="auto" alt="Start screen norwegian" src="https://github.com/user-attachments/assets/6d363d87-18bd-47d8-a31f-8cc047761a2a" />
<img width="250" height="auto" alt="Game screen" src="https://github.com/user-attachments/assets/f372b17f-24f1-4783-be58-64dbe11dd1fc" />
<img width="250" height="auto" alt="Game screen win" src="https://github.com/user-attachments/assets/188174c8-7f01-448a-a647-87aec4e3c8e" />
<img width="250" height="auto" alt="Game screen loose" src="https://github.com/user-attachments/assets/eb8661e8-15dc-4536-a090-4169d470febe" />
<img width="250" height="auto" alt="Start screen with streak" src="https://github.com/user-attachments/assets/23aba42b-f58b-4419-8098-83144d1a06e6" />

---

## Project setup
> Run the following commands from the christmas-hangman directory.

### Prerequisites
* Node.js and npm
* Ionic CLI
* Android Studio with an Android emulator

### How to run
1. Navigate to the christmas-hangman directory
2. Install dependencies:
```sh
npm install
```
3. Build the application:
```sh
ionic build
```
4. Synchronize the Android project:
```sh
npx cap sync android
```
5. Open the project in Android Studio:
```sh
npx cap open android
```
6. Select an Android emulator and click **Run**

## Android emulator
The following emulator was used for testing:
* Device: Google Pixel 7
* Android version: Android 15.0 (API 35)
* Architecture: x86_64

The application was also manually tested on a physical Google Pixel 9 device.
