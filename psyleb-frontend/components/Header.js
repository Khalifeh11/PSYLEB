import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";
import { Ionicons } from '@expo/vector-icons';  


const Header = ({ job }) => {
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

          <View style={styles.logoutContainer}>
            {/* <Text style={styles.logout}>Logout</Text> */}
            <TouchableOpacity onPress={job}>
            <Ionicons name="settings-outline" size={30} color="white" />
            </TouchableOpacity>
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
