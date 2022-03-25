import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";

const List = ({ first, second, third, image}) => {
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
            <View style={styles.hr}></View>
          </View>
        </View>
    </View>
  );
};

export default List;

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
    fontStyle: 'italic',
    color: '#7a7a7a'
  },
  third: {
    maxWidth: 250,
    marginTop: 10
  },
  hr: {
    borderBottomColor: "rgba(0,0,0,0.2)",
    borderBottomWidth: 1,
    marginVertical: 20,
    width: 500,
  },
});
