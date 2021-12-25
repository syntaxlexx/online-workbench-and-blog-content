import React, { useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import Icon from "../components/Icon";

import ListItem from "../components/ListItem";
import ListItemDeleteAction from "../components/ListItemDeleteAction";
import ListItemSeparator from "../components/ListItemSeparator";
import Screen from "../components/Screen";

const initialMessages = [
  {
    id: 1,
    title: "T1",
    description: "D1",
    image: require("../assets/jacket.jpg"),
  },
  {
    id: 2,
    title: "T2",
    description: "D2",
    image: require("../assets/jacket.jpg"),
  },
  {
    id: 3,
    title: "T3",
    description: "D3",
    ImageComponent: () => <Icon name="email" />,
  },
];

function MessagesScreen(props) {
  const [messages, setMessages] = useState(initialMessages);
  const [refreshing, setRefreshing] = useState(false);

  const handleDelete = (message) => {
    // delete message from messages
    setMessages(messages.filter((m) => m.id != message.id));
    // delete in backend
  };

  return (
    <Screen>
      <FlatList
        data={messages}
        keyExtractor={(message) => message.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            subTitle={item.description}
            image={item.image}
            IconComponent={item.ImageComponent}
            onPress={() => console.log("item clicked", item)}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={() => setMessages([...initialMessages])}
      ></FlatList>
    </Screen>
  );
}

const styles = StyleSheet.create({});

export default MessagesScreen;
