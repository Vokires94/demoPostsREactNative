# demoPostsREactNative
Test posts with comments on react native

# Run in emulator

For local testing you need to have installed android studio or xcode depends on your OS(Windows/Mac OS) with configuration https://reactnative.dev/docs/environment-setup

For local testing use:
* cd test
* npm install
* expo start
* choose r to run in mobile device

# Prepare expo apk build config
use manual for more details https://docs.expo.dev/build/setup/

* npm install -g eas-cli (skip if done already)
* eas login
* eas build:configure
  
# Expo apk Android build
* Make sure to get familiar with process of creation apk in article (https://docs.expo.dev/build-reference/apk/)
* modify the eas.json by adding one of the following properties in a build profile:
    * developmentClient to true (default)
    * android.buildType to apk
    * android.gradleCommand to :app:assembleRelease, :app:assembleDebug or any other gradle command that produces .apk
* eas build -p android --profile preview
* Await build preparing
* Then go to your expo home page https://expo.dev/ select your build will be there
* Open the URL on your device, install the APK and run it.

* # Expo IOS Simulator build
* Make sure to get familiar with process of creation in article (https://docs.expo.dev/build-reference/simulators/)
* To install a build of your app on an iOS Simulator, modify the build profile in eas.json and set the ios.simulator value to true
* Run eas build -p ios --profile preview
* Await build preparing
* Run eas build:run -p ios to start in Ios simulator

