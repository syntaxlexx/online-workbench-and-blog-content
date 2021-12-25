// import { StatusBar } from 'expo-status-bar';
import React from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  Alert,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback,
  View,
  Image,
  SafeAreaView,
  Button,
  StatusBar,
  Platform,
} from "react-native";

export default function App() {
  const handlePress = () => {
    console.log("Text pressed");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text numberOfLines={1} onPress={handlePress}>
          Hello, Idiot 2j!
        </Text>
        <TouchableWithoutFeedback onPress={() => console.log("image tapped")}>
          <Image
            blurRadius={1}
            source={{
              width: 200,
              height: 300,
              uri: "https://picsum.photos/200/300",
            }}
          />
        </TouchableWithoutFeedback>

        <TouchableOpacity onPress={() => console.log("image opacity")}>
          <Image
            blurRadius={1}
            source={{
              width: 200,
              height: 300,
              uri: "https://picsum.photos/200/300",
            }}
          />
        </TouchableOpacity>

        <TouchableHighlight onPress={() => console.log("image highlight")}>
          <Image
            blurRadius={1}
            source={{
              width: 200,
              height: 300,
              uri: "https://picsum.photos/200/300",
            }}
          />
        </TouchableHighlight>

        <TouchableNativeFeedback onPress={() => console.log("native touch")}>
          <View
            style={{ width: 200, height: 70, backgroundColor: "orange" }}
          ></View>
        </TouchableNativeFeedback>

        <Button
          title="Click Me"
          onPress={() =>
            Alert.alert("My Title", "I was clicked", [
              { text: "Yes", onPress: () => console.log("Yes") },
              { text: "No", onPress: () => console.log("No") },
            ])
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
