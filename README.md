# CSCI591_EventPlannerApp

Requirements
To use Expo, you need to have the following tools installed on your machine:

Node.js LTS release - Only Node.js LTS releases (even-numbered) are recommended.
As Node.js officially states, "Production applications should only use Active LTS or Maintenance LTS releases". You can install Node.js using a version management tool (such as nvm or volta or any other of your choice) to switch between different Node.js versions.

cd EventPlanner

Install Dependencies:
npm install expo 

npx expo start
This will start a development server for you.

Running your React Native application
Install the Expo Go app on your iOS or Android phone and connect to the same wireless network as your computer. On Android, use the Expo Go app to scan the QR code from your terminal to open your project. On iOS, use the built-in QR code scanner of the default iOS Camera app.

Modifying your app
Now that you have successfully run the app, let's modify it. Open App.js in your text editor of choice and edit some lines. The application should reload automatically once you save your changes.

That's it!
Congratulations! You've successfully run and modified your first React Native app.

## Setup Unit test
$ cd EventPlanner
$ npx expo install jest-expo jest
$ npm install --save-dev react-test-renderer @testing-library/react-native
$ npm run test