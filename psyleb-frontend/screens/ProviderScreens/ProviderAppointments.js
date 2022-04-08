import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image
} from "react-native";
import React from "react";
import List from "../../components/List";
import AppointmentList from "../../components/AppointmentList";
import { useState } from "react";
import IP from "../../globals/IP";
import { userContext } from "../../userContext";
import { useContext } from "react";
import { useEffect } from "react";
import axios from "axios";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import { IconButton } from "react-native-paper";

const ProviderAppointments = ({ navigation }) => {
  const { currentUser, setCurrentUser } = useContext(userContext);
  // console.warn(currentUser);
  const [appointments, setAppointments] = useState();

  const fetchProviderAppointments = async () => {
    const url = `${IP}/api/user/provider-appointments`;
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
      console.log(error, "cant get appointments");
    }
  };

  // useEffect(() => {
  //   fetchAppointments();
  // }, []);

  useEffect(fetchProviderAppointments, []);

  const approveAppointment = async (id) => {
    const url = `${IP}/api/appointment/approve/${id}`;
    const token = currentUser.access_token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.get(url, config);
      const dataFetched = response.data;
      fetchProviderAppointments();
    } catch (error) {
      console.warn(error, "cant approve appointment");
    }
  };

  const declineAppointment = async (id) => {
    const url = `${IP}/api/appointment/decline/${id}`;
    const token = currentUser.access_token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.delete(url, config);
      const dataFetched = response.data;
      fetchProviderAppointments();
    } catch (error) {
      console.warn(error, "cant approve appointment");
    }
  };

  const todayDate = new Date();
  return (
    <View>
      <FlatList
        data={appointments && appointments.appointments}
        key={(item) => item.id}
        renderItem={({ item }) => (
          <AppointmentList
            first={format(parseISO(item.datetime), "iii, dd MMM ' - Time:' hh:mm a")}
            second={
              item.is_pending === 1
                ? item.first_name + " " + item.last_name + " (pending)"
                : item.first_name + " " + item.last_name + " (approved)"
            }
            third={item.city + " Clinic"}
            image={
              item.profile_pic ? (
                <Image
                  source={{
                    uri: `${IP}${item.profile_pic}`,
                  }}
                  style={styles.profileImage}
                />
              ) : (
                <Image
                  source={{
                    uri: "https://ca.slack-edge.com/T0NC4C7NK-U039444J2UR-g1e75ab176a1-512",
                  }}
                  style={styles.profileImage}
                />
              )
            }
            icon1={
              item.is_pending === 1 ? (
                <IconButton
                  color={"#5DB075"}
                  icon="checkbox-marked"
                  onPress={() => approveAppointment(item.id)}
                />
              ) : null
            }
            icon2={
              item.is_pending === 1 ? (
                <IconButton
                  color={"red"}
                  icon="delete-outline"
                  onPress={() => declineAppointment(item.id)}
                />
              ) : null
            }
          />
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

export default ProviderAppointments;
