#!/bin/bash

#
# Ant
#

yarn add @ant-design/react-native

yarn add react-native-webview

yarn add babel-plugin-import --dev

# https://docs.expo.io/guides/authentication/#web-apps
yarn add firebase

# https://docs.expo.io/versions/v37.0.0/sdk/auth-session/#installation
yarn add expo-auth-session 

# https://docs.expo.io/guides/authentication/#google
yarn add expo-application 

# https://docs.expo.io/versions/latest/sdk/securestore/
yarn add expo-secure-store

# 
# reactnavigation ref: https://www.youtube.com/watch?v=Hln37dE19bs
# 

# Install the required packages in your React Native project:
yarn add @react-navigation/native

# Installing dependencies into an Expo managed project
expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view

# https://reactnavigation.org/docs/upgrading-from-4.x#package-names
yarn add @react-navigation/stack @react-navigation/bottom-tabs @react-navigation/drawer

# sentry

yarn add @sentry/integrations

yarn add sentry-expo
