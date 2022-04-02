import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import ProfileIconContainer from "../components/ProfileIconContainer";
import { userContext } from "../userContext";
import { useContext } from "react";
import { Ionicons } from "@expo/vector-icons";


const Profile = ({ navigation }) => {
  const { currentUser, setCurrentUser } = useContext(userContext);
  const settingsNavigate = () => navigation.navigate("Settings");
  return (
    <SafeAreaView>
      <View>
        <Header
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
              <Text style={styles.bio}>
                Third Year Economics student at the University of beirut.
                Looking for a life coach to help me in my self discovery
                journey.
              </Text>
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
