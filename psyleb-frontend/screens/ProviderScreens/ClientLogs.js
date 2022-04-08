import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { useEffect } from "react";
import { useContext, useState } from "react";
import { userContext } from "../../userContext";
import axios from "axios";
import IP from "../../globals/IP";
import LogList from "../../components/LogList";
import MoodIcon from "../../components/MoodIcon";

const ClientLogs = ({ route }) => {
  const { currentUser, setCurrentUser } = useContext(userContext);
  const MyClient = route.params;
  const [clientLogs, setClientLogs] = useState();
//   console.warn(MyClient.id);

  const fetchMyClientLogs = async () => {
    const url = `${IP}/api/user/clientLogs/${MyClient.id}`;
    const token = currentUser.access_token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.get(url, config);
      const dataFetched = response.data;
      setClientLogs(dataFetched);
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(fetchMyClientLogs, []);

  return (
    <View>
       <FlatList
        data={clientLogs && clientLogs.logs}
        key={(item) => item.id}
        renderItem={({ item }) => (
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
            second={item.notes !=null ? item.notes : 'No notes'}
            third={item.hours_slept != null ? 
              "Slept " + item.hours_slept + " hours" : 'No Sleep Data'}
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

export default ClientLogs;

const styles = StyleSheet.create({});
