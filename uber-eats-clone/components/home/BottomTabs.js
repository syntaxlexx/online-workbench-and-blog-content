import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

function BottomTabs(props) {
  return (
    <View style={styles.container}>
      <Icon icon="home" text="Home"></Icon>
      <Icon icon="search" text="Browse"></Icon>
      <Icon icon="shopping-bag" text="Grocery"></Icon>
      <Icon icon="receipt" text="Receipt"></Icon>
      <Icon icon="user" text="Account"></Icon>
    </View>
  );
}

const Icon = ({ icon, text }) => (
  <TouchableOpacity>
    <View>
      <FontAwesome5 name={icon} size={25} style={styles.icon} />
      <Text style={styles.text}>{text}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 10,
    marginHorizontal: 30,
    justifyContent: "space-between",
  },
  item: {},
  icon: {
    marginBottom: 3,
    alignSelf: "center",
  },
});

export default BottomTabs;
