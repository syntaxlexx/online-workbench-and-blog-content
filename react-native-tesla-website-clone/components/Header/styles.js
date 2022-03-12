import {StyleSheet} from 'react-native';
import Constants from "expo-constants";

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    top: Constants.statusBarHeight + 10,
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  logo: {
    width: 100,
    height: 20,
    resizeMode: 'contain'
  },
  menu: {
    width: 25,
    height: 25,
    resizeMode: 'contain'
  }

  });

export default styles;