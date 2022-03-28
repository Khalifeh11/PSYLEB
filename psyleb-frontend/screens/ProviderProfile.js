import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import React, { useContext } from "react";
import { selectedProviderContext } from "../userContext";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import SmallButton from "../components/SmallButton";

const ProviderProfile = ({ navigation }) => {
  const { selectedProvider } = useContext(selectedProviderContext);
  const reviews = [
    {
      id: 1,
      Author: "First Author",
      text: "Good therapist. I like.",
    },
    {
      id: 2,
      Author: "Second Author",
      text: "Bad therapist. I don't like.",
    },
    {
      id: 3,
      Author: "Third Author",
      text: "Good therapist. I like little.",
    },
    {
      id: 4,
      Author: "Third Author",
      text: "Good therapist. I like little.",
    },
    {
      id: 5,
      Author: "Third Author",
      text: "Good therapist. I like little.",
    },
    {
      id: 6,
      Author: "Third Author",
      text: "Good therapist. I like little.",
    },
    {
      id: 7,
      Author: "Third Author",
      text: "Good therapist. I like little.",
    },
    {
      id: 8,
      Author: "Third Author",
      text: "Good therapist. I like little.",
    },
    {
      id: 9,
      Author: "Third Author",
      text: "Good therapist. I like little.",
    },
    {
      id: 10,
      Author: "Third Author",
      text: "Good therapist. I like little.",
    },
    {
      id: 11,
      Author: "Final Author",
      text: "Good therapist. I like little.",
    },
  ];
  return (
      <View>
        <Header />
        <View style={styles.userContainer}>
          <View style={styles.usernameContainer}>
            <Text style={styles.username}>
              {selectedProvider.first_name} {selectedProvider.last_name}
            </Text>
          </View>
          <View style={styles.buttonsContainer}>
            <View style={styles.appointmentButton}>
              <SmallButton text={"Request Appointment"} />
            </View>
            <View style={styles.messageButton}>
              <SmallButton text={"Message"} />
            </View>
          </View>
          <ScrollView>
            <View style={styles.ScrollView}>
          <View>
            <View style={styles.bioHeaderContainer}>
              <Text style={styles.bioHeader}>Bio</Text>
            </View>

            <View style={styles.bioContainer}>
              <Text style={styles.bio}>
                Clinical Psychologist with over 10 years of experience in the
                medical field. Experience in working with adults and teenagers.
                Specialized in mood disorders.
              </Text>
            </View>
          </View>
          <View style={styles.reviews}>
            <View style={styles.ReviewHeaderContainer}>
              <Text style={styles.ReviewHeader}>Reviews</Text>
            </View>
            {reviews.map((item)=>
              <View key={item.id}>
                <View style={styles.ReviewContainer}>
                  <Text style={styles.reviewAuthor}>{item.Author}</Text>
                  <Text style={styles.Review}>{item.text}</Text>
                </View>
                </View>
              )}
          </View>
          </View>
          </ScrollView>
        </View>
      </View>
      
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

  usernameContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  username: {
    fontSize: 25,
    fontWeight: "bold",
  },
  userContainer: {
    alignItems: "center",
  },
  bioHeaderContainer: {
    alignSelf: "flex-start",
    marginVertical: 5,
  },

  bioHeader: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 10
  },

  bioContainer: {
    backgroundColor: "#fff",
    width: 300,
    borderRadius: 10,
    padding: 10,
  },
  bio: {
    fontStyle: "italic",
    fontSize: 17,
  },

  reviews: {
    marginTop: 20,
    alignSelf: "flex-start",  
  },

  ReviewHeaderContainer: {
    alignSelf: "flex-start",
    marginBottom: 5,
  },

  ReviewHeader: {
    fontWeight: "bold",
    fontSize: 20,
  },

  reviewAuthor: {
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 18,
  },

  ReviewContainer: {
    backgroundColor: "#fff",
    width: 300,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  Review: {
    fontStyle: "italic",
    fontSize: 17,
  },
  ScrollView: {
    marginBottom: 750,
  }
});
