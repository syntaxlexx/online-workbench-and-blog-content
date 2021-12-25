import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Divider } from "react-native-elements";
import About from "../components/restaurantDetails/About";
import MenuItems from "../components/restaurantDetails/MenuItems";
import ViewCartButton from "../components/restaurantDetails/ViewCartButton";

const foods = [
  {
    title: "Cheese",
    description:
      "Lorem Ipsum Rapidiously implement mission-critical customer service for highly efficient alignments.",
    image:
      "https://thumbor.thedailymeal.com/68wjB6UnSfbZV1qgFEfedRJv8Qg=/870x565/https://www.thedailymeal.com/sites/default/files/2018/04/19/Hero_30%20best%20yelp%20restauratns_Edit_0.jpg",
    price: "$10.50",
  },
  {
    title: "Burger",
    description:
      "Lorem Ipsum Rapidiously implement mission-critical customer service for highly efficient alignments.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlIhGqlFWWQPQsZXPTqk25SMxBmXLQslNrRIpGt88SU5feutfOIbnlDxCvbSRT_fGOXVI&usqp=CAU",
    price: "$13.50",
  },
  {
    title: "Milk",
    description:
      "Lorem Ipsum Rapidiously implement mission-critical customer service for highly efficient alignments.",
    image:
      "https://thumbor.thedailymeal.com/68wjB6UnSfbZV1qgFEfedRJv8Qg=/870x565/https://www.thedailymeal.com/sites/default/files/2018/04/19/Hero_30%20best%20yelp%20restauratns_Edit_0.jpg",
    price: "$20.50",
  },
];

function RestaurantDetail({ route, navigation }) {
  return (
    <View style={styles.container}>
      <About route={route} />
      <Divider width={1.8} styles={{ marginVertical: 20 }} />
      <MenuItems restaurantName={route.params.name} foods={foods} />
      <ViewCartButton navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default RestaurantDetail;
