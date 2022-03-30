import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import TimePicker from "../components/TimePicker";
import { SafeAreaView } from "react-native-safe-area-context";
import { userContext } from "../userContext";
import { useContext } from "react";
import { useState } from "react";
import PrimaryButton from "../components/PrimaryButton";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";

const Health = () => {
  const { currentUser, setCurrentUser } = useContext(userContext);

  const [sleepValue, setSleepValue] = useState();
  const [moodValue, setMoodValue] = useState();
  const [diary, setDiary] = useState();
  const logMoodAPI = 'http://192.168.1.95:8000/api/logs/addLog'
  const token = currentUser.access_token;

  const logMood = async () => {
    const moodData = {
      mood: moodValue,
      notes: diary,
      hours_slept: sleepValue,
  }
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
  }
};
  try {
    const response = await axios.post(logMoodAPI, moodData, config);
    const dataFetched = response.data;
    console.warn(dataFetched);
  } catch (error) {
    console.warn(error);
  }
}
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.healthContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>
              Hello, {currentUser.user.first_name}!
            </Text>
            {/* <Text style={styles.headerText}>{cDay}/{cMonth}/{cYear}</Text> */}
          </View>
          <View style={[styles.moodIconContainer, styles.Item]}>
            <Text style={styles.moodText}>Log mood</Text>
            {/* <MoodIcons setHealthRating={setMoodValue}/> */}
            <View style={styles.moodContainer}>
              <TouchableOpacity onPress={() => setMoodValue(1)}>
                <MaterialIcons name="mood" size={50} color="#36D47F" />
                <Text style={styles.text}>Perfect</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setMoodValue(2)}>
                <MaterialIcons
                  name="sentiment-satisfied-alt"
                  size={50}
                  color="#75E265"
                />
                <Text style={styles.text}>Good</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setMoodValue(3)}>
                <MaterialIcons
                  name="sentiment-neutral"
                  size={50}
                  color="#FFD41A"
                />
                <Text style={styles.text}>Neutral</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setMoodValue(4)}>
                <MaterialIcons
                  name="sentiment-dissatisfied"
                  size={50}
                  color="#FF874D"
                />

                <Text style={styles.text}>Bad</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setMoodValue(5)}>
                <MaterialIcons
                  name="sentiment-very-dissatisfied"
                  size={50}
                  color="#FF4D4D"
                />
                <Text style={styles.text}>Awful</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.inputContainer, styles.Item]}>
            <TextInput
              style={styles.input}
              multiline={true}
              placeholder={"How are you feeling today?"}
              onChangeText={(text) => setDiary(text)}
            />
          </View>
          <View style={[styles.timeContainer, styles.Item]}>
            <TimePicker setHealthValue={setSleepValue} />
          </View>
          <View>
            <PrimaryButton text={"submit"} job={logMood} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Health;

const styles = StyleSheet.create({
  Item: {
    marginTop: 30,
  },

  moodContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 10,
  },
  text: {
    textAlign: "center",
  },

  header: {
    marginTop: 30,
    marginLeft: 10,
  },
  moodTextContainer: {
    marginLeft: 10,
  },
  moodIconContainer: {
    // backgroundColor: "rgba(189, 189, 189, 0.3)",
  },

  input: {
    borderWidth: 1,
    borderColor: "rgba(93, 176, 117, 1)",
    height: 150,
    width: 300,
    alignSelf: "center",
    borderRadius: 4,
    backgroundColor: "rgba(189, 189, 189, 0.3)",
    padding: 10,
  },

  moodText: {
    fontSize: 20,
    marginLeft: 10,
  },

  headerText: {
    fontSize: 30,
  },
  timeContainer: {
    alignSelf: "center",
  },
});
