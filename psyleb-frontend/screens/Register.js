import { View, Text, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import React from "react";
import PrimaryTextInput from "../components/PrimaryTextInput";
import { TextInput } from "react-native-paper";
import PrimaryButton from "../components/PrimaryButton";
import { Checkbox } from "react-native-paper";
import IP from "../globals/IP";
import axios from "axios";

const Register = ({ navigation }) => {
  const registerAPI = `${IP}/api/auth/register`;

  // state to control the checkbox
  const [client, setClient] = useState("unchecked");
  const [provider, setProvider] = useState("unchecked");

  // states to show hide password and confirm password
  const[passwordHidden, setPasswordHidden] = useState(true);
  const[confirmHidden, setConfirmHidden] = useState(true);


  const [data, setData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    user_type: "",
    password: "",
    confirm_password: "",
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
    });
  };

  const handleConfirm = (value) => {
    setData({
      ...data,
      confirm_password: value,
    });
  };

  const handleFirstName = (value) => {
    setData({
      ...data,
      first_name: value,
    });
  };

  const handleLastName = (value) => {
    setData({
      ...data,
      last_name: value,
    });
  };

  const handleClient = () => {
    if (client == "unchecked") {
      setClient("checked");
      setProvider("unchecked");
      setData({
        ...data,
        user_type: 1,
      });
    } else {
      setClient("unchecked");
    }
  };

  const handleProvider = () => {
    if (provider == "unchecked") {
      setProvider("checked");
      setClient("unchecked");
      setData({
        ...data,
        user_type: 2,
      });
    } else {
      setProvider("unchecked");
    }
  };

  const registerFetch = async () => {
    const newUser = {
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      password: data.password,
      password_confirmation: data.confirm_password,
      user_type: data.user_type,
    };
    try {
      const response = await axios.post(registerAPI, newUser);
      const dataFetched = response.data;
      navigation.navigate("Login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <PrimaryTextInput
        label={"First Name"}
        value={data.first_name}
        changeText={handleFirstName}
      />
      <PrimaryTextInput
        label={"Last Name"}
        value={data.last_name}
        changeText={handleLastName}
      />
      <PrimaryTextInput
        label={"Email"}
        value={data.email}
        changeText={handleEmail}
      />
      <PrimaryTextInput
        label={"Password"}
        isPassword={passwordHidden}
        changeText={handlePassword}
        icon={<TextInput.Icon name="eye" onPress={
          ()=> setPasswordHidden(!passwordHidden)}/>}
        value={data.password}
      />
      <PrimaryTextInput
        label={"Confirm Password"}
        isPassword={confirmHidden}
        changeText={handleConfirm}
        icon={<TextInput.Icon name="eye" onPress={
          ()=> setConfirmHidden(!confirmHidden)}/>}
        value={data.password_confirmation}
      />
      <View style={styles.checkbox}>
        <Checkbox.Item
          label="Client"
          status={client}
          color="#5DB075"
          onPress={handleClient}
        />
        <Checkbox.Item
          label="Provider"
          status={provider}
          color="#5DB075"
          onPress={handleProvider}
        />
      </View>
      <PrimaryButton text={"register"} job={registerFetch} color={"#5DB075"} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 50,
  },
  checkbox: {
    display: "flex",
    flexDirection: "row",
  },
});

export default Register;
