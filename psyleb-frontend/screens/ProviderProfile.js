import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Alert,
  Image,
  Linking
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
import { FontAwesome } from "@expo/vector-icons";

const ProviderProfile = ({ navigation }) => {
  // getting selected provider from explore page and setting it to context
  const { selectedProvider } = useContext(selectedProviderContext);
  const { currentUser, setCurrentUser } = useContext(userContext);
  const [appointmentDate, setAppointmentDate] = useState();

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
      Alert.alert('Appointment request sent');
    } catch (error) {
      console.log(error);
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
    const formattedDate = format(date, "yyyy-MM-dd hh:mm");
    // const AlertDate = format(date, "iii, dd MMM 'at' hh:mm:a");

    if (date < today) {
      Alert.alert("Invalid Date", "Please select a future date");
      hideDatePicker();
    } else {
      setAppointmentDate(formattedDate);
      // Alert.alert("Appointment Date", appointmentDate);
      fetchRequestAppointment();
      hideDatePicker();
    }
  };

  // review modal visibility states
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    marginTop: 100,
  };
  // getting review text on change from text input in modal
  const [reviewText, setReviewText] = useState("");

  const [providerReviews, setProviderReviews] = useState();

  const fetchAddReview = async () => {
    const url = `${IP}/api/user/addReview`;
    // console.warn(selectedProvider);
    const token = currentUser.access_token;
    const data = {
      text: reviewText,
      provider_id: selectedProvider.user_id,
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
    const url = `${IP}/api/user/providerReviews?provider_id=${selectedProvider.user_id}`;
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

  const [cellNumber, setCellNumber] = useState(selectedProvider.phone_number);
  const [whatsAppMessage, setWhatsAppMessage] = useState(
    `Hello, ${selectedProvider.first_name}!`
  );
  let URL =
    "whatsapp://send?text=" + whatsAppMessage + "&phone=961" + cellNumber;

  const sendMsg = () => {
    Linking.openURL(URL)
      .then((data)=> {
        console.log('whatsapp opened')
      })
      .catch(() => {
        Alert.alert("Make sure Whatsapp installed on your device");
      });
  };

  return (
    // <SafeAreaView style={[styles.root, { height: height, width: width }]}>

    <SafeAreaView>
      <Header
        image={
          selectedProvider.profile_pic ? (
            <Image
              source={{
                uri: `${IP}${selectedProvider.profile_pic}`,
              }}
              style={{
                width: 130,
                height: 130,
                borderRadius: 130,
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
                borderRadius: 130,
                borderWidth: 3,
                borderColor: "#fff",
              }}
            />
          )
        }
      />
      <View style={styles.usernameContainer}>
        <Text style={styles.username}>
          {selectedProvider.first_name} {selectedProvider.last_name}
        </Text>
      </View>

      <View style={styles.buttonsContainer}>
        <View style={styles.appointmentButton}>
          {/* <FontAwesome name="calendar" size={24} color="black" style={{alignSelf: 'center'}} onPress={showDatePicker}/> */}

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
          <MediumButton text={"Message"} job={sendMsg}/>
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
                  {selectedProvider.bio
                    ? selectedProvider.bio
                    : "This provider has no bio"}
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
                    <Button
                      color={"#5DB075"}
                      onPress={showModal}
                      uppercase={"True"}
                    >
                      <Text style={styles.addReviewBtn}>Add </Text>
                    </Button>
                  </Provider>
                </View>
              </View>
              {/* {console.warn(providerReviews && providerReviews.reviews)} */}
              <View>
                {providerReviews && providerReviews.reviews == "" ? (
                  <View style={styles.emptyReviewsState}>
                    <Text style={styles.emptyReviewsText}>
                      Be the first one to review
                    </Text>
                  </View>
                ) : (
                  providerReviews &&
                  providerReviews.reviews.map((item) => (
                    <View key={item.id}>
                      <View style={styles.ReviewContainer}>
                        <Text style={styles.reviewAuthor}>
                          {item.first_name + " " + item.last_name}
                        </Text>
                        <Text style={styles.Review}>{item.text}</Text>
                      </View>
                    </View>
                  ))
                )}
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
          <SmallButton text={"add"} color={"#5DB075"} job={fetchAddReview} />
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
    minHeight: 100,
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

  emptyReviewsState: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    backgroundColor: "#fff",
    borderRadius: 10,
    minHeight: 100,
  },

  emptyReviewsText: {
    fontSize: 18,
    fontStyle: "italic",
  },

  addReviewBtn: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
