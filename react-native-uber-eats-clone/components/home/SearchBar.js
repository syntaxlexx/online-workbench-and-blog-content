import React from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

function HeaderTabs({ cityHandler }) {
  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        query={{
          key: "AIzaSyDAMtX-hCPhp0DrzVOPEsr2x341xBRKVIU",
          language: "en",
        }}
        onPress={(data, details = null) => {
          const city = data.description.split(",")[0];
          cityHandler(city);
        }}
        onFail={(error) => console.log(error)}
        placeholder="Search"
        styles={{
          textInput: styles.searchTextInput,
          textInputContainer: styles.searchTextInputContainer,
        }}
        renderLeftButton={() => (
          <View style={styles.searchLeftButton}>
            <Ionicons name="location-sharp" size={24} />
          </View>
        )}
        renderRightButton={() => (
          <View style={styles.searchRightButton}>
            <AntDesign
              name="clockcircle"
              size={11}
              style={{ marginRight: 6 }}
            />
            <Text>Search</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 15,
  },
  searchBar: {},
  searchTextInput: {
    backgroundColor: "#eee",
    borderRadius: 20,
    marginTop: 7,
    fontWeight: "700",
  },
  searchTextInputContainer: {
    backgroundColor: "#eee",
    marginRight: 10,
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  searchLeftButton: {
    marginLeft: 10,
  },
  searchRightButton: {
    flexDirection: "row",
    backgroundColor: "white",
    marginRight: 9,
    padding: 9,
    borderRadius: 30,
    alignItems: "center",
  },
});

export default HeaderTabs;
