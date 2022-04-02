import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Avatar, IconButton } from "react-native-paper";

const AppointmentList = ({ first, second, third, image, icon1, icon2 }) => {
  return (
    <View>
      <View style={styles.providerContainer}>
        <View style={styles.avatarContainer}>
          <Avatar.Image size={60} source={image} style={styles.Avatar} />
        </View>
        <View style={styles.providerInfoContainer}>
          <Text style={styles.first}>{first}</Text>
          <Text style={styles.second}>{second}</Text>
          <Text style={styles.third}>{third}</Text>
          <View style={styles.iconButtons}>
            <View style={styles.checkbox}>{icon1}</View>
            <View style={styles.delete}>{icon2}</View>
          </View>
          <View style={styles.hr}></View>
        </View>
      </View>
    </View>
  );
};

export default AppointmentList;

const styles = StyleSheet.create({
  providerContainer: {
    flexDirection: "row",
    margin: 10,
  },

  providerInfoContainer: {
    marginLeft: 10,
  },

  first: {
    fontWeight: "bold",
    fontSize: 17,
  },
  second: {
    fontStyle: "italic",
    color: "#7a7a7a",
    maxWidth: 250,
  },
  third: {
    maxWidth: 250,
    marginTop: 10,
  },
  hr: {
    borderBottomColor: "rgba(0,0,0,0.2)",
    borderBottomWidth: 1,
    width: 500,
  },

  iconButtons: {
    flexDirection: "row",
    marginLeft: -10,
  },
});
