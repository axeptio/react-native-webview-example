# react-native-webview-example

**Disclaimer: we do not officially support this usage of the web version of the Axeptio SDK. Native iOS and Android SDKs are currently in development.**

This project demonstrates how we can leverage a WebView to use the web version of the Axeptio SDK to collect the consent of a user on mobile.

![Image of Axeptio on iOS](/images/ios.png)

## Requirements

You need to have a development environment setup for React Native. If that's not the case, please follow the instructions for both iOS and Android at https://reactnative.dev/docs/environment-setup

## Setup

1. Install dependencies

```bash
# Clone the repository
git clone https://github.com/agilitation/react-native-webview-example
cd react-native-webview-example

# Install dependencies
npm install
```

2. Configure the widget

Connect to your account at https://admin.axeptio.eu and get your `clientId` and `cookiesVersion`.

Now, open the `App.js` file and update the `clientId` and `cookiesVersion` props of the `AxeptioWidget` component. Once done, you need to update the `onConsent` callback function that will be used to control whether or not your analytics library should be enabled. In the example, we only execute a `console.log`, but depending on your situation, analytics libraries such as Firebase analytics or Segment offer easy ways to disable collection.

## Usage

### iOS

Just run

```bash
npx react-native run-ios
```

### Android

If your emulator has access to the internet, you can just run

```bash
npx react-native run-android
```

If your emulator doesn't have access to the internet, get the name of the device you want to use

```bash
emulator -list-avds
```

Then, start the device by specifying its name prefixed by a `@` and the `dns-server` parameter

```bash
emulator @Pixel_4_API_29 -dns-server 8.8.8.8
```

Now you can start the app by running

```bash
npx react-native run-android
```
