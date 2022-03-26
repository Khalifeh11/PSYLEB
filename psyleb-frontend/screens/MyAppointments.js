import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import List from "../components/List";
import { useState } from "react";

  
const MyAppointments = ({ navigation }) => {
  const [appointments,setAppointments]=useState([
    {
      id: 1,
      date: '27/3/2022',
      provider: 'Karim Khalifeh',
      location: 'Badaro'
    },
    {
      id: 2,
      date: '27/3/2022',
      provider: 'Charbel Daoud',
      location: 'Badaro'

    },
    {
      id: 3,
      date: '27/3/2022',
      provider: 'Joe Rizk',
      location: 'Badaro'
    },
  ]);
  return (
    <View>
      <FlatList 
        data={appointments}
        key={(item) => item.id}
        renderItem={({ item }) => (
      // <TouchableOpacity onPress={()=>{navigation.navigate('Chat')}}>
      <List first={item.date} second={item.provider} third={item.location} image={require("../assets/profile.jpg")} />
      // </TouchableOpacity>
      )} />
    </View>
  );
};

export default MyAppointments;

