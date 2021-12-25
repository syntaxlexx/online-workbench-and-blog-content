import React, { useEffect, useState } from "react";
import LottieView from "lottie-react-native";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import Constants from "expo-constants";
import { db } from "../firebase";

import MenuItems from "../components/restaurantDetails/MenuItems";

function OrderCompleted() {
  const [lastOrder, setLastOrder] = useState({ items: [] });
  const { items, restaurantName } = useSelector(
    (state) => state.cartReducer.selectedItems
  );

  const total = items
    .map((item) => Number(item.price.replace("$", "")))
    .reduce((prev, curr) => prev + curr, 0);

  const totalUSD = total.toLocaleString("en", {
    style: "currency",
    currency: "USD",
  });

  useEffect(() => {
    const unsubscribe = db
      .collection("orders")
      .orderBy("createdAt", "desc")
      .limit(1)
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          setLastOrder(doc.data());
        });
      });

    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <LottieView
          style={styles.lottie}
          source={require("../assets/animations/check-mark.json")}
          autoPlay
          loop={false}
          speed={0.8}
        />
        <Text style={styles.confirmation}>
          Your order at {restaurantName} has been placed for {totalUSD}
        </Text>
        <ScrollView>
          <MenuItems foods={lastOrder.items} hideCheckbox={true} />
          <LottieView
            style={styles.lottie2}
            source={require("../assets/animations/cooking.json")}
            autoPlay
            loop
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Constants.statusBarHeight,
  },
  content: {
    margin: 15,
    alignItems: "center",
    height: "100%",
  },
  confirmation: {
    fontSize: 20,
    fontWeight: "bold",
  },
  lottie: {
    height: 100,
    alignSelf: "center",
    marginBottom: 30,
  },
  lottie2: {
    height: 200,
    alignSelf: "center",
    marginBottom: 30,
  },
});

export default OrderCompleted;
