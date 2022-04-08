import { Text, View, FlatList, TouchableOpacity, Image, StyleSheet } from "react-native";
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
      console.log(error);
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
              second={item.email}
              third={item.phone_number}
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
            />
          </TouchableOpacity>
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
export default MyClients;
