import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MoodIcons from "../components/MoodIcons";
import { TextInput } from "react-native-paper";
import TimePicker from "../components/TimePicker";
import { SafeAreaView } from 'react-native-safe-area-context';


const Health = () => {
  return (
    <SafeAreaView>
    <View>
      <View>
      <Text>Log mood</Text>
      <MoodIcons />
      </View>
      <View>
      <TextInput multiline underlineColor="#5DB075" activeUnderlineColor="#5DB075" placeholder="How are you feeling today?"/>
      <TimePicker />
      </View>
    </View>
    </SafeAreaView>
  );
};

export default Health;

const styles = StyleSheet.create({});
