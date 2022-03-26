import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import List from "../components/List";
import { useState } from "react";

  
const MyChats = ({ navigation }) => {
  const [chats,setChats]=useState([
    {
      id: 1,
      name: 'Charbel Daoud',
      specialty: 'clinical psychologist',
      message: 'Hello Karim! Just reminding you about our appointment tomorrow'
    },
    {
      id: 2,
      name: 'Karim Khalifeh',
      specialty: 'clinical psychologist',
      message: "Don't forget your meds!"

    },
    {
      id: 3,
      name: 'Joe Rizk',
      specialty: 'clinical psychologist',
      message: 'Good session! See you next time'
    },
  ]);
  return (
    <View>
      <FlatList 
        data={chats}
        key={(item) => item.id}
        renderItem={({ item }) => (
      <TouchableOpacity onPress={()=>{navigation.navigate('Chat')}}>
      <List first={item.name} second={item.specialty} third={item.message} image={require("../assets/profile.jpg")} />
      </TouchableOpacity>
      )} />
    </View>
  );
};

export default MyChats;

