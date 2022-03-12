import {Dimensions, StyleSheet} from 'react-native';
import Constants from 'expo-constants'

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: Dimensions.get('window').height + Constants.statusBarHeight,
  },
  titles: {
    marginTop: '30%',
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: '500'
  },
  subtitle: {
    fontSize: 16,
    color: '#5c5362'
  },
  subtitleCTA: {
    fontSize: 16,
    color: '#5c5362',
    textDecorationLine: 'underline',
  },
  image: {
    width: '100%',
    height: "100%",
    resizeMode: 'cover',
    position: 'absolute'
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
  }
});

export default styles;