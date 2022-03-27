import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import { useNavigation } from '@react-navigation/native';

import ProfileIconContainer from "../../components/ProfileIconContainer";
// import ProviderSettings from "./ProviderSettings";
// import ProviderAppointments from "./ProviderAppointments";
// import ProviderChats from "./ProviderChats";
// import MyClients from "./MyClients";

const ProviderProfile = ({ navigation }) => {
  const settingsNavigate = () => navigation.navigate('ProviderSettings')
  return (
    <SafeAreaView>
      <View>
        <Header job={settingsNavigate}/>  
        <View style={styles.userContainer}>
          <View style={styles.usernameContainer}>
            <Text style={styles.username}>Provider</Text>
          </View>
          <View style={styles.bioContainer}>
            <Text style={styles.bio}>
              Clinical Psychologist specialized in treating mood disorders with an experience of 10 years in the field.
            </Text>
          </View>
          <View style={styles.iconsContainer}>
            <ProfileIconContainer icon={'date-range'} caption={'Appointments'} job={()=>navigation.navigate('ProviderAppointments')}/>
            <ProfileIconContainer icon={'people-alt'} caption={'Clients'} job={()=>navigation.navigate('MyClients')}/>
          </View>
          <View style={styles.chatContainer}>
          <ProfileIconContainer icon={'chat'} caption={'Chats'} job={()=>navigation.navigate('ProviderChats')}/>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProviderProfile;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "rgba(91, 176, 117, 1)",
    height: 150,
  },
  avatarContainer: {
    alignSelf: "center",
    marginTop: 60,
  },

  // editContainer: {
  //   alignSelf: "flex-start",
  //   marginLeft: 20,
  // },

  // edit: {
  //   fontWeight: "bold",
  //   fontSize: 17,
  //   color: "white",
  // },

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
  usernameContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  username: {
    fontSize: 25,
    fontWeight: "bold",
  },
  userContainer: {
    display: "flex",
    alignItems: "center",
  },
  bioContainer: {
    width: 223,
  },
  bio: {
    fontStyle: "italic",
  },
  iconsContainer: {
    flexDirection: "row",
    marginTop: 30,
    marginLeft: 30,
  },
  iconCaption: {
    textAlign: "center",
    color: "rgba(255, 255, 255, 1)",
    fontWeight: "bold",
  },
  chatContainer: {
    marginTop: 20,
    marginLeft: 30
  }
});

