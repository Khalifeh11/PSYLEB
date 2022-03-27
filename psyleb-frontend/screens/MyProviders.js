import { StyleSheet, Text, View, ScrollView, FlatList } from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";
import List from "../components/List";
import { useState } from "react";
  
const MyProviders = ({}) => {
  const [providers,setProviders]=useState([
    {
      id: 1,
      name: 'Charbel Daoud',
      job:'Clinical Psychologist',
      City: 'Beirut'
    },
    {
      id: 2,
      name: 'Karim Khalifeh',
      job:'Psychiatrist',
      City: 'Saida'
    },
    {
      id: 3,
      name: 'Joe Rizk',
      job:'Health Coach',
      City: 'Jounieh'
    },
  ]);
  return (
    <View>
      <FlatList 
        data={providers}
        key={(item) => item.id}
        renderItem={({ item }) => (
      <List first={item.name} second={item.job} third={item.City} image={require("../assets/profile.jpg")} />
      )} />
    </View>
  );
};

export default MyProviders;

