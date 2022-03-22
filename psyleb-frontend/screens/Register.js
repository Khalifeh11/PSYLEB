import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import React from "react";
import PrimaryTextInput from "../components/PrimaryTextInput";
import { TextInput } from "react-native-paper";
import PrimaryButton from "../components/PrimaryButton";
import { Checkbox } from "react-native-paper";

const Register = ({ navigation }) => {
  const [client, setClient] = useState("unchecked");
  const [provider, setProvider] = useState("unchecked");
  const handleClient = () => {
    if (client == "unchecked" && provider == "unchecked") {
      setClient("checked");
    } else {
      setClient("unchecked");
    }
  };

  const handleProvider = () => {
    if (provider == "unchecked" && client == "unchecked") {
      setProvider("checked");
    } else {
      setProvider("unchecked");
    }
  };
  return (
    <View style={styles.container}>
      <PrimaryTextInput label={"First Name"} />
      <PrimaryTextInput label={"Last Name"} />
      <PrimaryTextInput label={"Email"} />
      <PrimaryTextInput
        label={"Password"}
        isPassword={true}
        icon={<TextInput.Icon name="eye" />}
      />
      <PrimaryTextInput
        label={"Confirm Password"}
        isPassword={true}
        icon={<TextInput.Icon name="eye" />}
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
      <PrimaryButton text={"register"} />
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
