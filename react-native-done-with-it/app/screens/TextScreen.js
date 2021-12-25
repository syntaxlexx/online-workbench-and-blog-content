import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";

function TextScreen(props) {
  return (
    <View style={styles.container}>
      <Text styles={styles.text}>I am a marmaid!</Text>
      <MaterialCommunityIcons name="email" size={60} color="dodgerblue" />

      <AppText>Hi, am App Text</AppText>
      <AppButton
        title="Login"
        onPress={() => console.log("tapped")}
      ></AppButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "tomato",
    ...Platform.select({
      ios: {
        fontSize: 20,
        fontFamily: "Avenir",
      },
      android: {
        fontSize: 18,
        fontFamily: "Roboto",
      },
    }),
  },
});

export default TextScreen;
