import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import * as Notifications from "expo-notifications";

import AppScreen from "../components/AppScreen";
import Icon from "../components/Icon";
import ListItem from "../components/ListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import colors from "../config/colors";
import useAuth from "../auth/useAuth";
import logger from "../utility/logger";

const menuITems = [
  {
    title: "My Listings",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: colors.primary,
    },
  },
  {
    title: "My Messages",
    icon: {
      name: "email",
      backgroundColor: colors.secondary,
    },
    targetScreen: "Messages",
  },
];

function AccountScreen({ navigation }) {
  const { user, logout } = useAuth();

  const showNotification = () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "Congratulations!",
        body: "You order was successfully placed!",
      },
      trigger: null,
    });

    Notifications.scheduleNotificationAsync({
      content: {
        title: "Future!",
        body: "Manenos!",
      },
      trigger: {
        seconds: 10,
        repeats: false,
      },
    });
  };

  return (
    <AppScreen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title={user.name}
          subTitle={user.email}
          image={require("../assets/logo.png")}
        ></ListItem>
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuITems}
          keyExtractor={(menuItem) => menuItem.title}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              onPress={() => navigation.navigate(item.targetScreen)}
            />
          )}
          ItemSeparatorComponent={ListItemSeparator}
        ></FlatList>
      </View>

      <View style={styles.single}>
        <ListItem
          title="Notify Me"
          IconComponent={<Icon name="alert" backgroundColor="blue" />}
          onPress={() => showNotification()}
        />
      </View>

      <View style={styles.single}>
        <ListItem
          title="Contact Messages"
          IconComponent={<Icon name="message" backgroundColor="green" />}
          onPress={() => navigation.navigate("ContactMessages")}
        />
      </View>

      <ListItem
        title="Logout"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
        onPress={() => logout()}
      />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  screen: {},
  container: {
    marginVertical: 20,
  },
  single: {
    marginBottom: 20,
  },
});

export default AccountScreen;
