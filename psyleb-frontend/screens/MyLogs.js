import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import LogList from "../components/LogList";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import MoodIcon from "../components/MoodIcon";
import IP from "../globals/IP";
import { userContext } from "../userContext";


const MyLogs = () => {
  const [logs, setLogs] = useState();
  const { currentUser, setCurrentUser } = useContext(userContext);
  const token = currentUser.access_token;
  const getLogsAPI = `${IP}/api/user/logs`;
  const fetchLogs = async () => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      const response = await axios.get(getLogsAPI, config);
      const data = response.data;
      setLogs(data.logs);
    } catch (error) {
      console.log("can't get logs", error);
    }
  };

    useEffect(fetchLogs, []);

  return (
    <View>
      <FlatList
        data={logs}
        key={(item) => item.id}
        renderItem={({ item }) => (
          // <TouchableOpacity onPress={()=>{navigation.navigate('Chat')}}>
          <LogList
            first={
              item.mood === 1
                ? "Perfect"
                : item.mood === 2
                ? "Good"
                : item.mood === 3
                ? "Neutral"
                : item.mood === 4
                ? "Bad"
                : "Awful"
            }
            second={item.notes}
            third={item.hours_slept != null ? 
              "Slept " + item.hours_slept + " hours" : null}
            icon={
              item.mood === 1 ? (
                <MoodIcon name={"mood"} size={50} color={"#36D47F"} />
              ) : item.mood === 2 ? (
                <MoodIcon
                  name={"sentiment-satisfied-alt"}
                  size={50}
                  color={"#75E265"}
                />
              ) : item.mood === 3 ? (
                <MoodIcon
                  name={"sentiment-neutral"}
                  size={50}
                  color={"#FFD41A"}
                />
              ) : item.mood === 4 ? (
                <MoodIcon
                  name={"sentiment-dissatisfied"}
                  size={50}
                  color={"#FF874D"}
                />
              ) : (
                <MoodIcon
                  name={"sentiment-very-dissatisfied"}
                  size={50}
                  color={"#FF4D4D"}
                />
              )
            }
          />
        )}
      />
    </View>
  );
};

export default MyLogs;

const styles = StyleSheet.create({});
