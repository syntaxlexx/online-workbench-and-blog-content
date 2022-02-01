import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import navigationTheme from "./app/navigation/navigationTheme";
import AppNavigator from "./app/navigation/AppNavigator";
import NetInfo, { useNetInfo } from "@react-native-community/netinfo";

export default function App() {
  const netInfo = useNetInfo();
  if (!netInfo.isInternetReachable) {
    console.log("Network Unreachable!");
  } else {
    console.log("Network is Fine!");
  }

  return (
    <NavigationContainer theme={navigationTheme}>
      <AppNavigator />
    </NavigationContainer>
  );
}
