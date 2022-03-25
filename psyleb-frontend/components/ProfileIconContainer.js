import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";


const ProfileIconContainer = ({icon, caption, job}) => {
  return (
    <View>
      <View style={styles.iconContainer}>
      <TouchableOpacity onPress={job}>
           <MaterialIcons
            style={{ alignSelf: "center" }}
            name= {icon}
            size={80}
            color="rgba(255, 255, 255, 0.8)"
          />
        <Text style={styles.iconCaption}>{caption}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileIconContainer;

const styles = StyleSheet.create({
    iconContainer: {
        alignSelf: "center",
        elevation: 1,
        borderRadius: 4,
        marginRight: 20,
        justifyContent: "center",
        backgroundColor: "rgba(91, 176, 117, 0.9)",
        padding: 10,
        minHeight: 100,
        width: 120,
      },
      iconCaption: {
        textAlign: "center",
        color: "rgba(255, 255, 255, 1)",
        fontWeight: "bold",
      },
});
