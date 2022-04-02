import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";

const LogList = ({ first, second, third, icon}) => {
  return (
    <View>
        <View style={styles.providerContainer}>
          <View style={styles.avatarContainer}>
              {icon}
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

export default LogList;

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
    color: '#7a7a7a',
    maxWidth: 250,
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
