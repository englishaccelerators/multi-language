
# Play Store Publishing Guide

1. Prerequisites:
   - Google Play Developer Account ($25 one-time)
   - Android Studio installed

2. Project Setup:
   - Use `expo eject` or `react-native init`
   - Update `android/app/build.gradle` with your package ID

3. Generate APK:
   - Run: `cd android && ./gradlew assembleRelease`
   - APK will be in: `android/app/build/outputs/apk/release/`

4. Upload to Play Console:
   - Go to https://play.google.com/console
   - Create a new app
   - Upload the signed APK
   - Fill in title, description, screenshots, etc.

5. Review & Publish
