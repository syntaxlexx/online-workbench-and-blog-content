import React from "react";
import { ScrollView, StyleSheet, Text, View, Image } from "react-native";

const items = [
  { image: require("../../assets/images/bread.png"), text: "Bread" },
  { image: require("../../assets/images/deals.png"), text: "Deals" },
  { image: require("../../assets/images/coffee.png"), text: "Coffee" },
  { image: require("../../assets/images/fast-food.png"), text: "Fast Food" },
  { image: require("../../assets/images/desserts.png"), text: "Desserts" },
  {
    image: require("../../assets/images/shopping-bag.png"),
    text: "Shopping Bag",
  },
  { image: require("../../assets/images/soft-drink.png"), text: "Soft Drink" },
];

function HeaderTabs(props) {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {items.map((item, index) => (
          <View key={index} style={styles.listContainer}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.text}>{item.text}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingLeft: 20,
  },
  listContainer: {
    marginRight: 30,
    alignItems: "center",
  },
  text: {
    fontWeight: "900",
    fontSize: 13,
    color: "black",
  },
  image: {
    width: 50,
    height: 40,
    resizeMode: "contain",
  },
});

export default HeaderTabs;
