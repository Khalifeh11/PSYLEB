import { Text, View, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import IP from "../../globals/IP";
import { useState, useContext, useEffect } from "react";
import { userContext } from "../../userContext";
import axios from "axios";
import List from "../../components/List";

const MyClients = ({ navigation }) => {
  const [clients, setClients] = useState();
  const { currentUser, setCurrentUser } = useContext(userContext);

  const fetchMyClients = async () => {
    const url = `${IP}/api/user/myClients`;
    const token = currentUser.access_token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.get(url, config);
      const dataFetched = response.data;
      setClients(dataFetched);
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(fetchMyClients, []);

  return (
    <View>
      <FlatList
        data={clients && clients.MyClients}
        key={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("MyClientProfile", item);
              // console.warn(item)
            }}
          >
            <List
              first={item.first_name + " " + item.last_name}
              second={item.occupation}
              third={item.City}
              image={require("../../assets/profile.jpg")}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default MyClients;
