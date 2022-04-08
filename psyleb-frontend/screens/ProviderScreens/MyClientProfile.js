import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, Linking } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import ProfileIconContainer from "../../components/ProfileIconContainer";
import { useContext } from "react";
import { userContext } from "../../userContext";
import { Ionicons } from "@expo/vector-icons";
import IP from "../../globals/IP";
import MediumButton from "../../components/MediumButton";


const MyClientProfile = ({ navigation, route }) => {
  const { currentUser, setCurrentUser } = useContext(userContext);
  const myClient = route.params;
  // console.warn(myClient.phone_number)
  const [cellNumber, setCellNumber] = useState(myClient.phone_number);
  const [whatsAppMessage, setWhatsAppMessage] = useState(`Hello, ${myClient.first_name}!`);
  let URL = 'whatsapp://send?text=' +  whatsAppMessage + '&phone=961' + cellNumber;

  const sendMsg = () => {
  Linking.openURL(URL)
      .then((data) => {
        console.log('WhatsApp Opened');
      })
      .catch(() => {
        Alert.alert('Make sure Whatsapp installed on your device');
      });
  };

  return (
    <SafeAreaView>
      <View>
        <Header
        image={ 
          myClient.profile_pic ? 
          
          <Image source={{ uri: `${IP}${myClient.profile_pic}` }} style={styles.profileImage} /> 
          : 
          <Image source={{uri: "https://ca.slack-edge.com/T0NC4C7NK-U039444J2UR-g1e75ab176a1-512"}} style={styles.profileImage} />
        }
        />
        <View style={styles.userContainer}>
          <View style={styles.usernameContainer}>
            <Text style={styles.username}>
              {myClient.first_name} {myClient.last_name}
            </Text>
          </View>
          <View style={styles.messageButton}>
          <MediumButton text={"message"} color={'green'} job={sendMsg}/>
        </View>
          <View>
            <View style={styles.bioHeaderContainer}>
              <Text style={styles.bioHeader}>Bio</Text>
            </View>
            <View style={styles.bioContainer}>
              <Text style={myClient.bio ? styles.bio : styles.bioEmpty}>
                {myClient.bio ? myClient.bio : "This Client has no bio"}
              </Text>
            </View>
          </View>
          <View style={styles.iconsContainer}>
            <ProfileIconContainer
              icon={"border-color"}
              //auto-stories
              caption={"Logs"}
              job={() => {
                navigation.navigate("MyClientLogs", myClient)}}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MyClientProfile;

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

  bioHeaderContainer: {
    alignSelf: "flex-start",
  },

  bioHeader: {
    fontWeight: "bold",
    fontSize: 17,
  },

  bioContainer: {
    backgroundColor: "#fff",
    width: 263,
    borderRadius: 10,
    padding: 15,
    minHeight: 100,
  },

  bio: {
    fontStyle: "italic",
    fontSize: 15,
  },

  bioEmpty: {
    fontStyle: "italic",
    fontSize: 15,
    color: "grey",
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

  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 130 / 2,
    borderWidth: 3,
    borderColor: "#fff",
  },

});
