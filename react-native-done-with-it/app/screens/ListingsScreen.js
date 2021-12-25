import React from "react";
import { FlatList, StyleSheet } from "react-native";
import Screen from "../components/Screen";
import AppCard from "../components/AppCard";
import colors from "../config/colors";

const listings = [
  {
    id: 1,
    title: "Red jacket for sale",
    price: 100,
    image: require("../assets/jacket.jpg"),
  },
  {
    id: 2,
    title: "Couch in great coondition",
    price: 150,
    image: require("../assets/jacket.jpg"),
  },
];

function ListingsScreen(props) {
  return (
    <Screen style={styles.screen}>
      <FlatList
        data={listings}
        keyExtractor={(listing) => listing.id.toString()}
        renderItem={({ item }) => (
          <AppCard
            title={item.title}
            subTitle={"$" + item.price}
            image={item.image}
          />
        )}
      ></FlatList>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 5,
    backgroundColor: colors.light,
  },
});

export default ListingsScreen;
