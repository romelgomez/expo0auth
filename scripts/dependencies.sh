#!/bin/bash

#
# ant
#
yarn add @ant-design/react-native react-native-webview

yarn add babel-plugin-import --dev

# ..:: update the file: babel.config.js

# module.exports = function(api) {
#   api.cache(true);
#   return {
#     presets: ['babel-preset-expo','module:metro-react-native-babel-preset'],
#     plugins: [
#       ['import', {libraryName: '@ant-design/react-native'}],
#     ],
#   };
# };


#
# https://docs.expo.io/guides/authentication/#web-apps
# https://docs.expo.io/versions/v37.0.0/sdk/auth-session/#installation
# https://docs.expo.io/guides/authentication/#google
# https://docs.expo.io/versions/latest/sdk/securestore/
#
yarn add firebase expo-auth-session expo-application expo-secure-store expo-google-app-auth

# 
# reactnavigation ref: https://www.youtube.com/watch?v=Hln37dE19bs
# 
# Install the required packages in your React Native project:
# Installing dependencies into an Expo managed project
# https://reactnavigation.org/docs/upgrading-from-4.x#package-names

yarn add @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs @react-navigation/drawer

expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view

#
# sentry
#
yarn add @sentry/integrations sentry-expo
