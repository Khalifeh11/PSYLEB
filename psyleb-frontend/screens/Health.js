import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { userContext } from "../userContext";
import { useContext } from "react";
import { useState } from "react";
import PrimaryButton from "../components/PrimaryButton";
import axios from "axios";
import MoodIcon from "../components/MoodIcon";
import { format, differenceInHours } from "date-fns";
import SmallButton from "../components/SmallButton";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import IP from "../globals/IP";
import { Button } from "react-native-paper";

const Health = ({ navigation }) => {
  // logged in user
  const { currentUser, setCurrentUser } = useContext(userContext);

  //todays date
  const todayDate = new Date();
  const formattedDate = format(todayDate, "iii, dd MMM");

  const [sleepValue, setSleepValue] = useState();

  // states to handle icon pressed and change mood state
  const [moodValue, setMoodValue] = useState();
  const [pressed, setPressed] = useState(false);

  const handleIconPress = (iconNumber) => {
    setPressed(true);
    if (moodValue !== iconNumber) {
      setMoodValue(iconNumber);
    } else {
      setMoodValue(null);
    }
  };
  // diary states
  const [diary, setDiary] = useState();

  // sleep and wake states
  // const [sleepTime, setSleepTime] = useState();
  // const [wakeTime, setWakeTime] = useState();
  // const [hoursSlept, sethoursSlept] = useState();

  const [sleepData, setSleepData] = useState({
    sleepTime: "",
    wakeTime: "",
    formatted_sleepTime: "",
    formatted_wakeTime: "",
    hours_slept: "",
  });

  // date picker visibility states
  const [isSleepPickerVisible, setSleepPickerVisibility] = useState(false);
  const [isWakePickerVisible, setWakePickerVisibility] = useState(false);

  const showSleepPicker = () => {
    setSleepPickerVisibility(true);
  };

  const showWakePicker = () => {
    setWakePickerVisibility(true);
  };

  const hideSleepPicker = () => {
    setSleepPickerVisibility(false);
  };

  const hideWakePicker = () => {
    setWakePickerVisibility(false);
  };

  // date picker functions
  const handleSleepConfirm = (Sleep) => {
    // const timeOfSleep = format(Sleep, "hh:mm:ss");
    // setSleepTime(timeOfSleep);
    setSleepData({
      ...sleepData,
      sleepTime: Sleep,
      formatted_sleepTime: format(Sleep, "hh:mm a"),
    });

    hideSleepPicker();
    // console.log("sleep time", timeOfSleep);
  };

  const handleWakeConfirm = (Wake) => {
    // const timeOfWake = format(Wake, "hh:mm:ss");
    // setWakeTime(timeOfWake);
    setSleepData({
      ...sleepData,
      wakeTime: Wake,
      formatted_wakeTime: format(Wake, "hh:mm a"),
    });
    // console.log("wake time", timeOfWake);
    hideWakePicker();
  };

  // function to calculate hours slept
  const calculateHoursOfsleep = () => {
    // if (sleepTime && wakeTime) {
    //   const sleepTimeInHours = differenceInHours(
    //     console.warn(new Date(wakeTime)),
    //     new Date(sleepTime)
    //   );
    //   sethoursSlept(sleepTimeInHours);
    //   console.log("hours slept", sleepTimeInHours);
    // }

    if (sleepData.sleepTime && sleepData.wakeTime) {
      const sleepTimeInHours = differenceInHours(
        new Date(sleepData.sleepTime),
        new Date(sleepData.wakeTime)
      );
      // sethoursSlept(sleepTimeInHours);
      setSleepData({
        ...sleepData,
        hours_slept: Math.abs(sleepTimeInHours),
      });
      // console.warn("skeeo", sleepData.hours_slept);
    }
  };

  // function to post sleep data to database
  //async function section
  const logMoodAPI = `${IP}/api/logs/addLog`;
  const token = currentUser.access_token;

  const logMood = async () => {
    calculateHoursOfsleep();
    const moodData = {
      mood: moodValue,
      notes: diary,
      hours_slept: sleepData.hours_slept,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      if (moodData.mood) {
        const response = await axios.post(logMoodAPI, moodData, config);
        const dataFetched = response.data;
        console.log(dataFetched);
        Alert.alert("Mood logged!");
      } else {
        Alert.alert("Should at least log your mood");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // function to get samsung health data
 // samsung health api 
 

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.healthContainer}>
          <View style={styles.firstSection}>
            <View style={styles.firstHeader}>
              <Text style={styles.headerText}>
                Hello, {currentUser.user.first_name}!
              </Text>
              {/* <View style={styles.smallButton}>
                <Button color={'#5DB075'} onPress={() => navigation.navigate("MyLogs")} uppercase={false}>
                  <Text style={styles.logsBtn}>Logs</Text>
                </Button>
              </View> */}

              {/* <View style={styles.smallButton}>
                <Button color={'#5DB075'} onPress={() => console.log('hello')} uppercase={false}>
                  <Text style={styles.logsBtn}>update</Text>
                </Button>
              </View> */}
            </View>

            <Text style={styles.date}>{formattedDate}</Text>
          </View>
          <View style={[styles.moodIconContainer, styles.Item]}>
            <Text style={styles.moodText}>Log your mood</Text>
            <View style={styles.moodContainer}>
              <TouchableOpacity onPress={() => handleIconPress(1)}>
                <MoodIcon
                  name={"mood"}
                  size={50}
                  color={moodValue === 1 ? "#36D47F" : "grey"}
                />
                <Text style={styles.text}>Perfect</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleIconPress(2)}>
                <MoodIcon
                  name={"sentiment-satisfied-alt"}
                  size={50}
                  color={moodValue === 2 ? "#75E265" : "grey"}
                />
                <Text style={styles.text}>Good</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleIconPress(3)}>
                <MoodIcon
                  name={"sentiment-neutral"}
                  size={50}
                  color={moodValue === 3 ? "#FFD41A" : "grey"}
                />

                <Text style={styles.text}>Neutral</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleIconPress(4)}>
                <MoodIcon
                  name={"sentiment-dissatisfied"}
                  size={50}
                  color={moodValue == 4 ? "#FF874D" : "grey"}
                />

                <Text style={styles.text}>Bad</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleIconPress(5)}>
                <MoodIcon
                  name={"sentiment-very-dissatisfied"}
                  size={50}
                  color={moodValue == 5 ? "#FF4D4D" : "grey"}
                />
                <Text style={styles.text}>Awful</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.inputContainer, styles.Item]}>
            <TextInput
              style={styles.input}
              multiline={true}
              placeholder={
                moodValue == 1
                  ? "Share your happiness"
                  : moodValue == 2
                  ? "Good is better than neutral"
                  : moodValue == 3
                  ? "Why neutral?"
                  : moodValue == 4
                  ? "Whats bothering you?"
                  : moodValue == 5
                  ? "Oh no! Better write down your feelings"
                  : "How are you feeling today?"
              }
              onChangeText={(text) => setDiary(text)}
            />
          </View>
          <View style={[styles.timeContainer, styles.Item]}>
            <View>
              <PrimaryButton
                title="Log hours of sleep"
                job={showSleepPicker}
                text={"When did you sleep?"}
                color={"#042a2b"}
              />
              <PrimaryButton
                title="Log hours of Wake"
                job={showWakePicker}
                text={"When did you wake up?"}
                color={"#042a2b"}
              />
              {/* <PrimaryButton
                title="hours of sleep"
                job={calculateHoursOfsleep}
                text={"Calculate Sleep"}
              /> */}

              {/* <Text>Woke up at {sleepData.formatted_wakeTime}</Text> */}
              {/* <Text>Slept for {sleepData.hours_slept} hours</Text> */}

              <DateTimePickerModal
                isVisible={isSleepPickerVisible}
                mode="datetime"
                onConfirm={(value) => {
                  handleSleepConfirm(value);
                }}
                onCancel={hideSleepPicker}
              />
              <DateTimePickerModal
                isVisible={isWakePickerVisible}
                mode="datetime"
                aa
                onConfirm={(value) => {
                  handleWakeConfirm(value);
                }}
                onCancel={hideWakePicker}
              />
            </View>
          </View>
          <View style={styles.sleepTextContainer}>
            {sleepData.formatted_sleepTime ? (
              <Text style={styles.sleepTime}>
                Slept at {sleepData.formatted_sleepTime}
              </Text>
            ) : null}
            {sleepData.formatted_wakeTime ? (
              <Text style={styles.sleepTime}>
                Woke up at {sleepData.formatted_wakeTime}
              </Text>
            ) : null}
          </View>
          <View style={styles.submitButton}>
            <PrimaryButton text={"submit"} job={logMood} color={"#5DB075"} />
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

  firstSection: {
    marginTop: 20,
    marginLeft: 10,
  },
  firstHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  smallButton: {
    alignSelf: "flex-end",
    marginRight: 6,
  },

  logsBtn: {
    fontSize: 18,
    fontWeight: "bold",
  },

  moodTextContainer: {
    marginLeft: 10,
  },
  moodIconContainer: {
    // backgroundColor: "rgba(189, 189, 189, 0.3)",
  },

  input: {
    borderWidth: 1,
    borderColor: "#042a2b",
    height: 150,
    width: 300,
    alignSelf: "center",
    borderRadius: 4,
    backgroundColor: "rgba(189, 189, 189, 0.3)",
    padding: 10,
    fontSize: 17,
    textAlignVertical: "top",
  },

  moodText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 25,
  },

  headerText: {
    fontSize: 26,
    fontWeight: "bold",
    marginLeft: 15,
  },

  date: {
    fontSize: 18,
    marginLeft: 15,
    // alignSelf: "flex-end",
  },

  timeContainer: {
    alignSelf: "center",
  },
  submitButton: {
    alignSelf: "center",
    marginTop: 30,
  },

  sleepTextContainer: {
    flexDirection: "row",
    // justifyContent: "space-between",
    marginTop: 10,
  },
  sleepTime: {
    fontSize: 18,
    marginLeft: 15,
  },
  wakeTime: {
    fontSize: 18,
    marginRight: 15,
  },
});
