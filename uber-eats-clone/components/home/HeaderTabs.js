import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

function HeaderTabs({ activeTab, setActiveTab }) {
  return (
    <View style={styles.container}>
      <HeaderButton
        text="Delivery"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <HeaderButton
        text="Pickup"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </View>
  );
}

const HeaderButton = ({ text, activeTab, setActiveTab }) => (
  <TouchableOpacity
    style={[
      styles.button,
      { backgroundColor: activeTab === text ? "black" : "white" },
    ]}
    onPress={() => setActiveTab(text)}
  >
    <Text
      style={[
        styles.buttonText,
        { color: activeTab === text ? "white" : "black" },
      ]}
    >
      {text}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignSelf: "center",
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "900",
  },
});

export default HeaderTabs;
