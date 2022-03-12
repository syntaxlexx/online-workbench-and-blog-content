import React from 'react'
import {ImageBackground, Text, View} from 'react-native'
import styles from "./styles";
import StyledButton from "../StyledButton";

const CarItem = ({car}) => {
  const {name, tagline, taglineCTA, image} = car

  return (
    <View style={styles.container}>
      <ImageBackground
        source={image} style={styles.image}/>

      <View style={styles.titles}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.subtitle}>
          {tagline} {' '}
          <Text style={styles.subtitleCTA}>{taglineCTA}</Text>
        </Text>
      </View>

      <View style={styles.buttonsContainer}>
        <StyledButton type="primary" content={"Custom Order"} onPress={() => console.log('clicked')}/>
        <StyledButton type="secondary" content={"Existing Inventory"} onPress={() => console.log('clicked again')}/>
      </View>
    </View>
  )
}

export default CarItem;