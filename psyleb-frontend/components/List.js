import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Avatar, IconButton } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import IP from "../globals/IP";
import { userContext } from "../userContext";
import { useContext } from "react";

const List = ({ first, second, third, image }) => {
  const { currentUser, setCurrentUser } = useContext(userContext);

  return (
    <View>
      <View style={styles.providerContainer}>
        <View style={styles.avatarContainer}>
          {/* <Avatar.Image size={60} source={image} style={styles.Avatar} /> */}
          {/* <Image
            source={{
              uri: `${IP}${currentUser.user.profile_pic}`,
            }}
            style={styles.profileImage}
          /> */}
          {image}
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

  // profileImage: {
  //   width: 60,
  //   height: 60,
  //   borderRadius: 30,
  //   marginLeft: 10,
  // },

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
    marginVertical: 10,
    width: 500,
  },
});
