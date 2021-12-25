import {
  useDeviceOrientation,
  useDimensions,
} from "@react-native-community/hooks";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";

export default function App() {
  const { landscape } = useDeviceOrientation();

  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
        flexDirection: "row",
        justifyContent: "center", // main axis
        alignItems: "baseline", // secondary/cross. Individual items
        // alignContent: 'center' // works only when wrap is enabled. Entire container
      }}
    >
      <View
        style={{
          backgroundColor: "dodgerblue",
          width: 100,
          height: 200,
        }}
      ></View>
      <View
        style={{
          backgroundColor: "gold",
          width: 100,
          height: 100,
          left: 20, // move it 20 pixels to the left
          bottom: 20, // move it 20 pixels from the bottom
        }}
      ></View>
      <View
        style={{
          backgroundColor: "tomato",
          width: 100,
          height: 400,
          // flexBasis: 100, // width or height
          // flexGrow: 1, // same as flex: 1
        }}
      ></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
