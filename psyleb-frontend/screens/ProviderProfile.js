import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Alert,
} from "react-native";
import React, { useContext, useEffect } from "react";
import { selectedProviderContext } from "../userContext";
import { userContext } from "../userContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { Modal, Portal, Provider, Button, TextInput } from "react-native-paper";
import Header from "../components/Header";
import MediumButton from "../components/MediumButton";
import { useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import axios from "axios";
import IP from "../globals/IP";
import format from "date-fns/format";
import SmallButton from "../components/SmallButton";
import { Dimensions } from "react-native";

const ProviderProfile = ({ navigation }) => {
  // getting selected provider from explore page and setting it to context
  const { selectedProvider } = useContext(selectedProviderContext);
  const { currentUser, setCurrentUser } = useContext(userContext);
  const [appointmentDate, setAppointmentDate] = useState();
  // console.warn(selectedProvider.user_id)

  const fetchRequestAppointment = async () => {
    const url = `${IP}/api/appointment/request`;
    const token = currentUser.access_token;
    const data = {
      datetime: appointmentDate,
      provider_id: selectedProvider.user_id,
      city: selectedProvider.city,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.post(url, data, config);
      const dataFetched = response.data;
      Alert.alert("Appointment Requested");
    } catch (error) {
      console.warn(error);
    }
  };

  // date picker modal visibility states
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  // on cofirm action
  const handleConfirm = (date) => {
    const today = new Date();
    const formattedDate = format(date, "yyyy-MM-dd HH:mm");
    if (date < today) {
      Alert.alert("Invalid Date", "Please select a future date");
      hideDatePicker();
    } else {
      setAppointmentDate(formattedDate);
      fetchRequestAppointment();
      hideDatePicker();
    }
  };

  
  // review modal visibility states
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20, marginTop: 100 };
  // getting review text on change from text input in modal
  const [reviewText, setReviewText] = useState("");

  const [providerReviews, setProviderReviews] = useState();

  const fetchAddReview = async () => {
    const url = `${IP}/api/user/addReview`;
    const token = currentUser.access_token;
    const data = {
      text : reviewText,
      provider_id: selectedProvider.id,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.post(url, data, config);
      const dataFetched = response.data;
      fetchGetProviderReviews();
      Alert.alert("Review Added");
    } catch (error) {
      console.warn(error);
    }
  };

  const fetchGetProviderReviews = async () => {
    const url = `${IP}/api/user/providerReviews?provider_id=${selectedProvider.id}`;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${currentUser.access_token}`,
        },
      };
      const response = await axios.get(url, config);
      const dataFetched = response.data;
      setProviderReviews(dataFetched);
      // console.warn(providerReviews);
    } catch (error) {
      console.warn(error);
    }
  };


  useEffect(fetchGetProviderReviews, []);

  const { width, height } = Dimensions.get("window");

  return (
    // <SafeAreaView style={[styles.root, { height: height, width: width }]}>
    <SafeAreaView>
    <Header />
      <View style={styles.usernameContainer}>
        <Text style={styles.username}>
          {selectedProvider.first_name} {selectedProvider.last_name}
        </Text>
      </View>

      <View style={styles.buttonsContainer}>
        <View style={styles.appointmentButton}>
          <MediumButton text={"Request Appointment"} job={showDatePicker} />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="datetime"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            minimumDate={new Date()}
          />
        </View>
        <View style={styles.messageButton}>
          <MediumButton text={"Message"} />
        </View>
      </View>

      {/* <View> */}
      <ScrollView>
        <View style={{ alignItems: "center" }}>
          <View style={styles.ScrollView}>
            <View>
              <View style={styles.bioHeaderContainer}>
                <Text style={styles.bioHeader}>Bio</Text>
              </View>
              <View style={styles.bioContainer}>
                <Text style={styles.bio}>
                  Clinical Psychologist with over 10 years of experience in the
                  medical field. Experience in working with adults and
                  teenagers. Specialized in mood disorders.
                </Text>
              </View>
            </View>
            <View style={styles.reviews}>
              <View style={styles.reviewButtonRow}>
                <View style={styles.ReviewHeaderContainer}>
                  <Text style={styles.ReviewHeader}>Reviews</Text>
                </View>
                <View style={styles.addReviewButtonContainer}>
                  <Provider>
                    <SmallButton
                      text={"Add"}
                      color={"#5DB075"}
                      job={showModal}
                    />
                  </Provider>
                </View>
              </View>
              <View>
                {providerReviews && providerReviews.reviews.map((item) => (
                  <View key={item.id}>
                    <View style={styles.ReviewContainer}>
                      <Text style={styles.reviewAuthor}>{item.first_name + ' ' + item.last_name}</Text>
                      <Text style={styles.Review}>{item.text}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      {/* </View> */}

      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}
      >
        <Text style={{ fontSize: 15, fontWeight: "bold", marginBottom: 10 }}>
          Add your review
        </Text>
        <TextInput
          mode="outlined"
          multiline={true}
          outlineColor={"#5DB075"}
          activeOutlineColor={"#5DB075"}
          onChangeText={(text) => setReviewText(text)}
        />
        <View style={styles.buttonInsideModal}>
          <SmallButton text={"add"} color={"#5DB075"} job={fetchAddReview}/>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ProviderProfile;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#FCFCFC",
  },

  header: {
    backgroundColor: "rgba(91, 176, 117, 1)",
    // height: 150,
  },
  avatarContainer: {
    alignSelf: "center",
    // marginTop: 60,
  },

  usernameContainer: {
    marginTop: 50,
    alignSelf: "center",
  },
  username: {
    fontSize: 25,
    fontWeight: "bold",
  },

  userContainer: {
    alignItems: "center",
  },

  buttonsContainer: {
    alignItems: "center",
  },

  bioHeaderContainer: {
    alignSelf: "flex-start",
    marginVertical: 5,
  },

  bioHeader: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 10,
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
  },

  reviewButtonRow: {
    flexDirection: "row",
  },

  ReviewHeaderContainer: {
    alignSelf: "flex-start",
    marginBottom: 5,
  },

  addReviewButtonContainer: {
    alignSelf: "flex-end",
    marginLeft: 130,
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

  buttonInsideModal: {
    alignSelf: "center",
    marginTop: 10,
  },

  ScrollView: {
    marginBottom: 375,
  },
});
