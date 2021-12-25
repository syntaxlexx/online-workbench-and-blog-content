import React from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Divider } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

function MenuItems({ restaurantName, foods, hideCheckbox, marginLeft = 0 }) {
  const dispatch = useDispatch();
  const selectItem = (item, checkboxValue) =>
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        ...item,
        restaurantName: restaurantName,
        checkboxValue: checkboxValue,
      },
    });

  const cartItems = useSelector(
    (state) => state.cartReducer.selectedItems.items
  );

  const isFoodInCart = (food, cartItems) =>
    Boolean(cartItems.find((item) => item.title === food.title));

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {foods.map((food, index) => (
        <View key={index}>
          <View style={styles.itemsContainer}>
            {!hideCheckbox ? (
              <BouncyCheckbox
                iconStyle={styles.checkboxIconStyle}
                fillColor="green"
                onPress={(checkboxValue) => selectItem(food, checkboxValue)}
                isChecked={isFoodInCart(food, cartItems)}
              />
            ) : null}
            <FoodInfo
              title={food.title}
              description={food.description}
              price={food.price}
            />

            <FoodImage image={food.image} marginLeft={marginLeft} />
          </View>
          <Divider
            width={0.5}
            orientation="vertical"
            style={{ marginHorizontal: 20 }}
          />
        </View>
      ))}
    </ScrollView>
  );
}

const FoodInfo = ({ title, description, price }) => (
  <View style={styles.infoContainer}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.description}>{description}</Text>
    <Text style={styles.price}>{price}</Text>
  </View>
);

const FoodImage = ({ image, marginLeft }) => (
  <View style={styles.imageContainer}>
    <Image source={{ uri: image }} style={[styles.image, {marginLeft}]} />
  </View>
);

const styles = StyleSheet.create({
  itemsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },
  infoContainer: {
    width: 240,
    justifyContent: "space-evenly",
  },
  title: {
    fontSize: 19,
    fontWeight: "600",
  },
  description: {},
  price: {},
  imageContainer: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 100,
  },
  checkboxIconStyle: {
    borderColor: "lightgray",
    borderRadius: 0,
  },
});

export default MenuItems;
