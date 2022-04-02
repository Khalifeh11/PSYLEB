import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'

const PrimaryButton = ({ job, text, color }) => {
  return (
    <View style={styles.button}>
        <Button mode='contained' color={color} onPress={job}>
            <Text style={styles.buttonText}>{text}</Text>
        </Button>
    </View>
  )
}

const styles = StyleSheet.create({
    button: {
        margin: 10,
        width: 300,
    },
    buttonText: {
      color: 'white'
    }
})

export default PrimaryButton