import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React from "react";
import { useState, useContext, useEffect } from "react";
import { userContext } from "../userContext";
import axios from "axios";
import IP from "../globals/IP";
import SmallButton from "../components/SmallButton";

const Header = ({ settings, image }) => {
  
  const { currentUser, setCurrentUser } = useContext(userContext);

  return (
    <View>
      <View style={styles.header}>
      {/* onPress={pickImage} */}
          <View style={styles.avatarContainer}>
            {/* {currentUser.user.profile_pic == null ? 
            (<Image
              source={{
                uri: 'https://ca.slack-edge.com/T0NC4C7NK-U039444J2UR-g1e75ab176a1-512'
              }} //http://192.168.1.95:8000
              style={styles.profileImage}
            /> ) : (
              <Image
                source={{
                  uri: `${IP}${currentUser.user.profile_pic}`,
                }} 
                style={styles.profileImage}
              />
            )} */}{image}
          </View>
       
        <View>{settings}</View>
        
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

  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 130,
    borderColor: '#fff',
    borderWidth: 3,
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
