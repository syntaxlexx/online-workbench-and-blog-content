import {StatusBar} from 'expo-status-bar';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import CarsList from "./components/CarsList";
import Header from "./components/Header";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <CarsList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
