import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import List from "../components/List";
import { useState } from "react";
import IP from "../globals/IP";
import { userContext } from "../userContext";
import { useContext } from "react";
import { useEffect } from "react";
import axios from "axios";
import format from "date-fns/format";

const MyAppointments = ({ navigation }) => {
  const { currentUser, setCurrentUser } = useContext(userContext);
  const [appointments, setAppointments] = useState();

  const fetchAppointments = async () => {
    const url = `${IP}/api/user/appointments`;
    const token = currentUser.access_token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.get(url, config);
      const dataFetched = response.data;
      setAppointments(dataFetched);
    } catch (error) {
      console.warn(error);
    }
  };

  // useEffect(() => {
  //   fetchAppointments();
  // }, []);

  useEffect(fetchAppointments, []);

  return (
    <View>
      <FlatList
        data={appointments && appointments.appointments}
        key={(item) => item.id}
        renderItem={({ item }) => (
          // <TouchableOpacity onPress={()=>{navigation.navigate('Chat')}}>
          //format(todayDate, "iii, dd MMM")
          <List
            // first={format(todayDate, "iii, dd MMM")}
            first={item.datetime}
            second={
              (item.is_pending == 1
                ? item.first_name + " " + item.last_name + " (pending)"
                : item.first_name + " " + item.last_name)
            }
            third={item.city}
            image={require("../assets/profile.jpg")}
          />
          // </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default MyAppointments;

