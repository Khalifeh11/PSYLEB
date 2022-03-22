import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";


const Profile = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Avatar.Image
              size={130}
              source={require("../assets/profile.jpg")}
              style={styles.avatar}
            />
          </View>
        </View>
        <View style={styles.userContainer}>
          <View style={styles.usernameContainer}>
            <Text style={styles.username}>John Doe</Text>
          </View>
          <View style={styles.bioContainer}>
            <Text style={styles.bio}>
              Third Year Economics student at the University of beirut. Looking
              for a life coach to help me in my self discovery journey.
            </Text>
          </View>
          <View style={styles.iconsContainer}>
            <View style={styles.appointmentContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate("MyAppointments")}
              >
                <MaterialIcons
                  style={{ alignSelf: "center" }}
                  name="date-range"
                  size={80}
                  color="rgba(50, 50, 50, 1)"
                />
                <Text style={styles.iconCaption}>Appointments</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.providerContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate("MyProviders")}
              >
                <MaterialIcons
                  style={{ alignSelf: "center" }}
                  name="people-alt"
                  size={80}
                  color="rgba(50, 50, 50, 1)"
                />
                <Text style={styles.iconCaption}>Providers</Text>
              </TouchableOpacity>
            </View>
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
    marginTop: -50,
  },
  avatarContainer: {
    alignSelf: "center",
    marginTop: 60,
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
  appointmentContainer: {
    flex: 0.35,
    alignSelf: "center",
    elevation: 1,
    borderRadius: 4,
    height: 100,
    marginRight: 20,
    justifyContent: "center",
    backgroundColor: "rgba(91, 176, 117, 0.9)",
  },
  providerContainer: {
    flex: 0.35,
    alignSelf: "center",
    elevation: 1,
    borderRadius: 4,
    height: 100,
    marginLeft: 20,
    justifyContent: "center",
    backgroundColor: "rgba(93, 176, 117, 0.9)",
  },
  iconsContainer: {
    flexDirection: "row",
    marginTop: 50,
  },
  iconCaption: {
    textAlign: "center",
    color: "rgba(50, 50, 50, 1)",
    fontWeight: "bold",
  },
});
