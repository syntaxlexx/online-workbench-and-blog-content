import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { db } from "../../firebase";
import { serverTimestamp } from "firebase/firestore";
import LottieView from "lottie-react-native";

import OrderItem from "./OrderItem";

function ViewCartButton({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const addOrderToFirebase = () => {
    setLoading(true);
    db.collection("orders")
      .add({
        items: items,
        restaurantName: restaurantName,
        createdAt: serverTimestamp(),
      })
      .then(() => {
        setLoading(false);
        navigation.navigate("OrderCompleted");
      });
  };

  const checkoutModalContext = () => {
    return (
      <View style={styles.modal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{restaurantName}</Text>

            {items.map((item, index) => (
              <OrderItem key={index} title={item.title} price={item.price} />
            ))}

            <View style={styles.modalSubtotalContainer}>
              <Text style={styles.modalSubtotal}>Subtotal</Text>
              <Text style={styles.modalSubtotal}>{totalUSD}</Text>
            </View>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  setModalVisible(false);
                  addOrderToFirebase();
                }}
              >
                <Text style={styles.modalButtonText}>Checkout</Text>
                <Text style={styles.modalButtonText}>{totalUSD}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        {checkoutModalContext()}
      </Modal>

      {total ? (
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.text}>View Cart</Text>
              <Text style={styles.text}>{totalUSD}</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}

      {loading ? (
        <View style={styles.loading}>
          <LottieView
            style={styles.lottie}
            source={require("../../assets/animations/scanner.json")}
            autoPlay
            loop
            speed={3}
          />
        </View>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    position: "absolute",
    bottom: 50,
    zIndex: 999,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "black",
    alignItems: "center",
    marginTop: 20,
    padding: 13,
    width: 300,
    position: "relative",
    borderRadius: 30,
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  text: {
    color: "white",
    fontSize: 20,
  },
  modal: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  modalContainer: {
    padding: 16,
    backgroundColor: "white",
    height: 500,
    borderWidth: 1,
  },
  modalContent: {},
  modalTitle: {
    color: "black",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 18,
  },
  modalCheckoutButton: {
    fontWeight: "600",
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  modalSubtotalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    paddingHorizontal: 20,
  },
  modalSubtotal: {
    textAlign: "left",
    fontWeight: "600",
    fontSize: 15,
    marginBottom: 10,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  modalButton: {
    marginTop: 20,
    position: "relative",
    marginBottom: 20,
    alignItems: "center",
    padding: 13,
    backgroundColor: "black",
    borderRadius: 30,
    width: 300,
    flexDirection: "row",
    justifyContent: "center",
  },
  modalButtonText: {
    color: "white",
    fontSize: 20,
    marginHorizontal: 10,
  },
  loading: {
    backgroundColor: "black",
    height: "100%",
    width: "100%",
    position: "absolute",
    opacity: 0.6,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    flex: 1,
  },
  lottie: {
    height: 200,
  },
});

export default ViewCartButton;
