import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import PrimaryTextInput from '../components/PrimaryTextInput'
import { TextInput } from 'react-native-paper'
import PrimaryButton from '../components/PrimaryButton'

const Register = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <PrimaryTextInput label={'First Name'}/>
      <PrimaryTextInput label={'Last Name'}/>
      <PrimaryTextInput label={'Email'}/>
      <PrimaryTextInput label={'Password'} isPassword={true}/>
      <PrimaryTextInput label={'Confirm Password'} isPassword={true}/>
      <PrimaryButton text={'register'}/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      marginVertical: 50
    },
  });

export default Register