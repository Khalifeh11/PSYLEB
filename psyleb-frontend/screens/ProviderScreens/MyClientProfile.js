import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import ProfileIconContainer from "../../components/ProfileIconContainer";
import { useContext } from "react";
import { userContext } from "../../userContext";
import { Ionicons } from "@expo/vector-icons";


const MyClientProfile = ({ navigation, route }) => {
  const { currentUser, setCurrentUser } = useContext(userContext);
  const myClient = route.params;
//   console.warn(myClient)
  return (
    <SafeAreaView>
      <View>
        <Header
        />
        <View style={styles.userContainer}>
          <View style={styles.usernameContainer}>
            <Text style={styles.username}>
              {myClient.first_name} {myClient.last_name}
            </Text>
          </View>
          <View>
            <View style={styles.bioHeaderContainer}>
              <Text style={styles.bioHeader}>Bio</Text>
            </View>
            <View style={styles.bioContainer}>
              <Text style={styles.bio}>
                Third Year Economics student at the University of beirut.
                Looking for a life coach to help me in my self discovery
                journey.
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
    padding: 10,
  },
  bio: {
    fontStyle: "italic",
    fontSize: 15,
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
});
