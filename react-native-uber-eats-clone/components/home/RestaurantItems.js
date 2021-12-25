import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

function RestaurantItems({ navigation, restaurants }) {
  return (
    <>
      {restaurants.map((restaurant, index) => (
        <View key={index}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.container}
            onPress={() =>
              navigation.navigate("RestaurantDetail", {
                name: restaurant.name,
                image: restaurant.image_url,
                price: restaurant.price,
                reviews: restaurant.review_count,
                rating: restaurant.rating,
                categories: restaurant.categories,
              })
            }
          >
            <View style={styles.item}>
              <RestaurantImage image={restaurant.image_url} />
              <RestaurantInfo restaurant={restaurant} />
            </View>
          </TouchableOpacity>
        </View>
      ))}
    </>
  );
}

const RestaurantImage = ({ image }) => (
  <>
    <Image
      style={styles.image}
      source={{
        uri: image,
      }}
    />
    <TouchableOpacity style={styles.likeButton}>
      <MaterialCommunityIcons name="heart-outline" size={25} color="white" />
    </TouchableOpacity>
  </>
);

const RestaurantInfo = ({ restaurant }) => (
  <View style={styles.infoContainer}>
    <View>
      <Text style={styles.infoTitle}>{restaurant.name}</Text>
      <Text style={styles.infoSubtitle}>30-45 • min</Text>
    </View>
    <View style={styles.infoRatingContainer}>
      <Text style={styles.infoRating}>{restaurant.rating}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  item: {
    backgroundColor: "#fff",
    marginTop: 10,
    padding: 15,
  },
  image: {
    width: "100%",
    height: 180,
  },
  likeButton: {
    position: "absolute",
    right: 20,
    top: 20,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: "bold",
  },
  infoSubtitle: {
    fontSize: 13,
    color: "gray",
  },
  infoRatingContainer: {
    backgroundColor: "#eee",
    height: 30,
    width: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  infoRating: {},
});

export default RestaurantItems;
