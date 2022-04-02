import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";
import List from "../components/List";
import { useState, useEffect, useContext } from "react";
import IP from "../globals/IP";
import { userContext } from "../userContext"; 
import axios from "axios"; 
import { selectedProviderContext } from "../userContext";

const MyProviders = ({ navigation }) => {
  const { currentUser, setCurrentUser } = useContext(userContext);
  const { selectedProvider, setSelectedProvider } = useContext(selectedProviderContext);

  const [providers,setProviders]=useState()


  const fetchMyProviders = async () => {
    const url = `${IP}/api/user/myProviders`;
    const token = currentUser.access_token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.get(url, config);
      const dataFetched = response.data;
      setProviders(dataFetched);
    } catch (error) {
      console.warn(error);
    }
  };

useEffect(fetchMyProviders, []);
// console.warn(providers && providers.MyProviders)

  return (
    <View>
      
      <FlatList 
        data={providers && providers.MyProviders}
        key={(item) => item.id}
        renderItem={({ item }) => (
      <TouchableOpacity onPress={
        ()=>{
          setSelectedProvider(item)
          navigation.navigate('MyProvidersProfile')
        }
        }>
      <List first={item.first_name + ' ' + item.last_name} second={item.occupation} third={item.City} image={require("../assets/profile.jpg")} />
      </TouchableOpacity>
      )} />


    </View>
  );
};

export default MyProviders;

