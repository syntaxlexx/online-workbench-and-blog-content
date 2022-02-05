import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AccountScreen from "../screens/AccountScreen";
import MessagesScreen from "../screens/MessagesScreen";
import ContactMessageScreen from "../screens/ContactMessageScreen";

const Stack = createNativeStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Profile" component={AccountScreen} />
    <Stack.Screen name="Messages" component={MessagesScreen} />
    <Stack.Screen
      name="ContactMessages"
      component={ContactMessageScreen}
      options={{ title: "Contact Messages" }}
    />
  </Stack.Navigator>
);

export default AccountNavigator;
