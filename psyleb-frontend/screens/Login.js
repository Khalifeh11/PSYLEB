import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import axios from "axios";

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loginFetch = async () => {
    const url = 'http://127.0.0.1:8000/api/auth/login';
    const user = {
      'email' : email,
      'password' : password
    }

    try {
      const response = await axios.post(url, user);
      const data = await response.data;
      console.log(data);
    } catch (error) {
      console.log("sign in error", error);
    }
  }
  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.textInput}
        placeholder= 'email'
        onChangeText={(e) => setEmail(e)}
      />
      <TextInput 
        style={styles.textInput}
        placeholder= 'password'
        onChangeText={(e) => setPassword(e)}
      />
      <Button title='login' onPress={loginFetch}/>
      <Text>Don't have an account? <Text onPress={() => navigation.navigate('Register')}>Sign Up</Text></Text>
    </View>
  );
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
