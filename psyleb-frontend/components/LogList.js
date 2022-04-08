import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";


const LogList = ({ first, second, third, icon, deleteIcon }) => {
  return (
    <View>
      <View style={styles.providerContainer}>
        <View style={styles.avatarContainer}>{icon}</View>
        <View style={styles.providerInfoContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.firstText}>{first}</Text>
            <TouchableOpacity style={styles.deleteContainer}>
              {deleteIcon}
            </TouchableOpacity>  
          </View>
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

  headerContainer: {
    flexDirection: "row",
    // backgroundColor: 'green',
   },

  firstText: {
    fontWeight: "bold",
    fontSize: 17,
    flex: 0.57,
  },

  // deleteContainer: {
  //   justifyContent: 'flex-end',
  //   alignContent: 'flex-end',
  // },

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
    marginVertical: 20,
    width: 500,
  },
});
