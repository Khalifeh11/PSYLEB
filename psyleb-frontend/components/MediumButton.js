import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'

const MediumButton = ({ job, text, disabled }) => {
  return (
    <View style={styles.button}>
        <Button mode='contained' color='#5DB075' onPress={job} disabled={disabled}>
            <Text style={styles.buttonText}>{text}</Text>
        </Button>
    </View>
  )
}

const styles = StyleSheet.create({
    button: {
        margin: 10,
        width: 250,
    },
    buttonText: {
      color: 'white'
    }
})

export default MediumButton