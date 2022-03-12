import React from 'react'
import {Dimensions, FlatList, View} from 'react-native'
import Constants from 'expo-constants'

import styles from "./styles";
import cars from "../../assets/cars";
import CarItem from "../CarItem";

const CarsList = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={cars}
        snapToAlignment={'start'}
        decelerationRate={'fast'}
        snapToInterval={Dimensions.get('window').height + Constants.statusBarHeight}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) =>
          <CarItem car={item}/>
        }
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  )
}

export default CarsList;