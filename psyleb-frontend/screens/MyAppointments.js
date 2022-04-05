import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
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
import parseISO from "date-fns/parseISO";

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
      const dataFetched = await response.data;
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
            first={format(parseISO(item.datetime), "iii, dd MMM '- Time:' hh:mm a")}
            second={
              (item.is_pending == 1
                ? item.city + " (pending)"
                : item.city)
            }
            third={item.first_name + " " + item.last_name}
            image={item.profile_pic ? <Image
              source={{
                uri: `${IP}${item.profile_pic}`
              }}
              style={styles.profileImage}
            /> : <Image
            source={{
              uri:"https://ca.slack-edge.com/T0NC4C7NK-U039444J2UR-g1e75ab176a1-512",
            }}
            style={styles.profileImage}
          />}
          />
          // </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginLeft: 10,
  },
});

export default MyAppointments;

