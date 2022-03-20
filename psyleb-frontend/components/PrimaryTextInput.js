import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { TextInput } from "react-native-paper";

const PrimaryTextInput = ({changeText, label, isPassword}) => {
  return (
    <View>
      <TextInput
        style={styles.textInput}
        mode="outlined"
        label= {label}
        secureTextEntry={isPassword}
        activeOutlineColor="#5DB075"
        onChangeText={changeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: 300,
    margin: 10,
  }
});


export default PrimaryTextInput;
