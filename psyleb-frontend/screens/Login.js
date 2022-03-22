import { StyleSheet, Text, View, Button, Image, Alert } from "react-native";
import { TextInput } from "react-native-paper";
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from "react";
import axios from "axios";
import Logo from "../components/Logo";
import PrimaryButton from "../components/PrimaryButton";
import PrimaryTextInput from "../components/PrimaryTextInput";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");


  const navigate = () => {
    navigation.navigate("Navigation");
  };

  const loginFetch = async () => {
    const url = "http://127.0.0.1:8000/api/auth/login";
    const user = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(url, user);
      const data = await response.data;
      navigation.navigate("Navigation");
      console.log(data);
    } catch (error) {
      console.log("sign in error", error);
    }
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Logo />
        <PrimaryTextInput
          label={"Email"}
          value={email}
          changeText={email=>setEmail(email)}
          isPassword={false}
        />
        <PrimaryTextInput
          label={"Password"}
          value={password}
          changeText={pass=>setPassword(pass)}
          isPassword={true}
          icon={<TextInput.Icon name="eye" />}
        />
        <PrimaryButton job={loginFetch} text="login" />
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
    justifyContent: "center",
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
