import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Register = () => {
  return (
    <View style={styles.container}>
      <Text>Register</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    textInput: {
      borderColor: 'black',
      backgroundColor: 'green',
      margin: 3,
    }
  });

export default Register