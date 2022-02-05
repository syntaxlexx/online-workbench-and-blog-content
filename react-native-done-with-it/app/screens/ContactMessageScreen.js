import React, { useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import AppScreen from "../components/AppScreen";
import ContactMessageForm from "../components/ContactMessageForm";

function ContactMessageScreen(props) {
  const [messages, setMessages] = useState([]);
  const scrollView = useRef();

  function handleAdded(message) {
    setMessages([...messages, message]);
  }

  return (
    <AppScreen style={styles.container}>
      <View style={styles.form}>
        <ContactMessageForm handleAdded={handleAdded} />
      </View>

      <ScrollView ref={scrollView}>
        <View style={styles.list}>
          {messages.map((item, index) => (
            <View key={index} style={styles.item}>
              <Text style={styles.subject}>{item.subject}</Text>
              <Text
                style={styles.message}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.message}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {},
  form: {
    backgroundColor: "white",
    padding: 10,
  },
  list: {
    marginTop: 30,
  },
  item: {
    flexDirection: "row",
    alignItems: "baseline",
    backgroundColor: "white",
    padding: 10,
    marginBottom: 10,
  },
  subject: {
    fontSize: 20,
    marginRight: 10,
  },
  message: {
    fontSize: 15,
    color: "gray",
  },
});

export default ContactMessageScreen;
