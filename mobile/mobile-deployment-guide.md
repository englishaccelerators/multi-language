
# 📱 Mobile Deployment Guide

This guide outlines how to build and deploy the English Dictionary app for Android and iOS using Expo and React Native.

---

## 🛠 Requirements

- Node.js installed
- Expo CLI installed: `npm install -g expo-cli`
- Expo account: [https://expo.dev](https://expo.dev)
- Android Studio (for Android builds) or Xcode (for iOS builds)

---

## 🚀 Build Steps

1. Navigate to the `mobile/` directory:

```bash
cd mobile
```

2. Start the development server:

```bash
expo start
```

3. To build for production:

- Android:
```bash
eas build -p android --profile production
```

- iOS:
```bash
eas build -p ios --profile production
```

> Ensure you’ve configured your `eas.json` and linked your Apple/Google credentials

4. After build completes, Expo will give you a download link or submit to store.

---

## 🔗 API URL Setup

Ensure the API base URL points to your deployed backend (e.g. Railway URL).

In `MobileToggleScreen.js` and other endpoints, replace:

```js
axios.get('https://yourdomain.com/api/...')
```

With your actual backend domain.

---

## ☁️ Publishing

- [App Store](https://developer.apple.com/app-store/)
- [Google Play Console](https://play.google.com/console/about/)

Use your Expo build credentials to submit binaries.

---

For help, visit: https://docs.expo.dev

