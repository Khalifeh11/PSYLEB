import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

const Header = ({ settings }) => {
  return (
    <View>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Avatar.Image
            size={130}
            source={require("../assets/profile.jpg")}
            style={styles.avatar}
          />
        </View>

        <View>
          {settings}
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "rgba(91, 176, 117, 1)",
    height: 150,
  },
  avatarContainer: {
    alignSelf: "center",
    marginTop: 60,
  },
  logoutContainer: {
    alignSelf: "flex-end",
    marginTop: -170,
    marginRight: 20,
  },
  logout: {
    fontWeight: "bold",
    fontSize: 17,
    color: "white",
  },
});
