import React from 'react'
import {Pressable, Text, View} from 'react-native'
import styles from "./styles";

const StyledButton = ({type = 'primary', content, onPress}) => {
  const backgroundColor = type === 'primary' ? '#171A20CC' : '#FFFFFFA6'
  const color = type === 'primary' ? '#FFFFFF' : '#171A20'

  return (
    <View style={styles.container}>
      <Pressable style={[styles.button, {
        backgroundColor,
      }]}
                 onPress={onPress}>
        <Text style={[styles.text, {
          color,
        }]}>{content}</Text>

      </Pressable>
    </View>
  )
}

export default StyledButton;