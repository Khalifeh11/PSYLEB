import { StyleSheet, Text, View, ScrollView, TextInput } from "react-native";
import React from "react";
import MoodIcons from "../components/MoodIcons";
// import { TextInput } from "react-native-paper";
import TimePicker from "../components/TimePicker";
import { SafeAreaView } from "react-native-safe-area-context";
import TimePicker2 from "../components/TimePicker2";

const Health = () => {
  let currentDate = new Date();
  let cDay = currentDate.getDate();
  let cMonth = currentDate.getMonth() + 1;
  let cYear = currentDate.getFullYear();

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.healthContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Hello, Karim!</Text>
            <Text style={styles.headerText}>{cDay}/{cMonth}/{cYear}</Text>
          </View>
          <View style={[styles.moodIconContainer, styles.Item]}>
            <Text style={styles.moodText}>Log mood</Text>
            <MoodIcons />
          </View>
          <View style={[styles.inputContainer, styles.Item]}>
            {/* <TextInput
              multiline
              underlineColor="#5DB075"
              activeUnderlineColor="#5DB075"
              placeholder="How are you feeling today?"
              style={styles.input}
            /> */}
            <TextInput
              style={styles.input}
              multiline={true}
              placeholder={"How are you feeling today?"}
              inlineImageLeft="search_icon"
            />
          </View>
          <View style={[styles.timeContainer, styles.Item]}>
            <TimePicker />
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
    height: 100,
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
