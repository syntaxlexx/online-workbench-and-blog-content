import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

function About({ route }) {
  const { name, image, price, reviews, rating, categories } = route.params;

  const formattedCategories = categories.map((cat) => cat.title).join(" • ");

  const description = `${formattedCategories} ${
    price ? " • " + price : ""
  } • ${rating} • ${reviews}`;

  return (
    <View>
      <Image source={{ uri: image }} style={styles.image} />
      <RestaurantImage image={image} />
      <RestaurantTitle text={name} />
      <RestaurantDescription text={description} />
    </View>
  );
}

const RestaurantImage = ({ image }) => <Image source={{ uri: image }} />;

const RestaurantTitle = ({ text }) => <Text style={styles.title}>{text}</Text>;

const RestaurantDescription = ({ text }) => (
  <Text style={styles.description}>{text}</Text>
);

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
  title: {
    fontSize: 29,
    fontWeight: "600",
    marginTop: 10,
    marginHorizontal: 15,
  },
  description: {
    fontSize: 14.5,
    marginVertical: 10,
    marginHorizontal: 15,
  },
});

export default About;
