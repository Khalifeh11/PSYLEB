import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import ProfileIconContainer from "../components/ProfileIconContainer";
import IP from "../globals/IP";
import { userContext } from "../userContext";
import { useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SmallButton from "../components/SmallButton";

const Profile = ({ navigation }) => {
  const { currentUser, setCurrentUser } = useContext(userContext);
  const settingsNavigate = () => navigation.navigate("Settings");

  // console.warn (currentUser);
  return (
    <SafeAreaView>
      <View>
        <Header
          image={
            currentUser.user.profile_pic ? (
              <Image
                source={{
                  uri: `${IP}${currentUser.user.profile_pic}`,
                }}
                style={{
                  width: 130,
                  height: 130,
                  borderRadius: 130 / 2,
                  borderWidth: 3,
                  borderColor: "#fff",
                }}
              />
            ) : (
              <Image
                source={{
                  uri: "https://ca.slack-edge.com/T0NC4C7NK-U039444J2UR-g1e75ab176a1-512",
                }}
                style={{
                  width: 130,
                  height: 130,
                  borderRadius: 130 / 2,
                  borderWidth: 3,
                  borderColor: "#fff",
                }}
              />
            )
          }
          settings={
            <View style={styles.logoutContainer}>
              <TouchableOpacity onPress={settingsNavigate}>
                <Ionicons name="settings-outline" size={30} color="white" />
              </TouchableOpacity>
            </View>
          }
        />
        <View style={styles.userContainer}>
          <View style={styles.usernameContainer}>
            <Text style={styles.username}>
              {currentUser.user.first_name} {currentUser.user.last_name}
            </Text>
          </View>
          <View>
            <View style={styles.bioHeaderContainer}>
              <Text style={styles.bioHeader}>Bio</Text>
            </View>
            <View style={styles.bioContainer}>
              <Text
                style={
                  currentUser.user.bio == null ? styles.emptyBio : styles.bio
                }
              >
                {currentUser.user.bio == null
                  ? "A bio would add a really nice touch to your profile"
                  : currentUser.user.bio}
              </Text>
              {/* {console.warn(currentUser.user.email)} */}
            </View>
          </View>
          <View style={styles.iconsContainer}>
            <ProfileIconContainer
              icon={"date-range"}
              caption={"Appointments"}
              job={() => navigation.navigate("MyAppointments")}
            />
            <ProfileIconContainer
              icon={"people-alt"}
              caption={"Providers"}
              job={() => navigation.navigate("MyProviders")}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

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
    margin: 10,
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
    color: "black",
  },

  emptyBio: {
    fontStyle: "italic",
    fontSize: 15,
    color: "gray",
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
