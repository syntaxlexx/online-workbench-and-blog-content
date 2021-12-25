import React from "react";
import { StyleSheet, Text, View } from "react-native";

function OrderItem({ title, price }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>{price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#999",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "black",
  },
  price: {
    fontSize: 16,
    opacity: 0.7,
    color: "black",
  },
});

export default OrderItem;
