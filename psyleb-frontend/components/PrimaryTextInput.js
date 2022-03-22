import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { TextInput } from "react-native-paper";

const PrimaryTextInput = ({ changeText, label, isPassword, icon, value, placeholder }) => {
  return (
    <View>
      <TextInput
        style={styles.textInput}
        mode="outlined"
        label={label}
        placeholder = {placeholder}
        value={value}
        secureTextEntry={isPassword}
        activeOutlineColor="#5DB075"
        onChangeText={changeText}
        right={icon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: 300,
    margin: 5,
  },
});

export default PrimaryTextInput;
