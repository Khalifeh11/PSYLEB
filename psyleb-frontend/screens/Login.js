import { StyleSheet, Text, View, Button, Image, Alert } from "react-native";
import { TextInput } from "react-native-paper";
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useContext } from "react";
import { userContext } from "../userContext";
import axios from "axios";
import Logo from "../components/Logo";
import PrimaryButton from "../components/PrimaryButton";
import PrimaryTextInput from "../components/PrimaryTextInput";
import { SafeAreaView } from "react-native-safe-area-context";
import IP from '../globals/IP'

export default function Login({ navigation }) {

  const loginAPI = `${IP}/api/auth/login`;
  const { currentUser, setCurrentUser } = useContext(userContext);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleEmail = (value) => {
    setData({
      ...data,
      email: value,
    });
  };

  const handlePassword = (value) => {
    setData({
      ...data,
      password: value,
    })
  }

  const loginFetch = async () => {
    const user = {
      email: data.email,
      password: data.password,
    };
    try {
      const response = await axios.post(loginAPI, user);
      const dataFetched = response.data;
      setCurrentUser(dataFetched);
    } catch (error) {
      console.warn(error)
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Logo />
        <PrimaryTextInput
          label={"Email"}
          value={data.email}
          changeText={handleEmail}
          isPassword={false}
        />
        <PrimaryTextInput
          label={"Password"}
          value={data.password}
          changeText={handlePassword}
          isPassword={true}
          icon={<TextInput.Icon name="eye" />}
        />
        <PrimaryButton job={loginFetch} text="login" color={'#5DB075'}/>
        <Text style={styles.signupText}>
          Don't have an account?{" "}
          <Text
            onPress={() => navigation.navigate("Register")}
            style={styles.signup}
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 150
  },
  image: {
    width: 50,
  },
  signupText: {
    marginTop: 10,
  },
  signup: {
    color: "#5DB075",
    fontWeight: "bold",
  },
});
