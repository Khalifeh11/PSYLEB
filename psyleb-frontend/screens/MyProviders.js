import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
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
  const { selectedProvider, setSelectedProvider } = useContext(
    selectedProviderContext
  );

  const [providers, setProviders] = useState();

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
          <TouchableOpacity
            onPress={() => {
              setSelectedProvider(item);
              navigation.navigate("MyProvidersProfile");
            }}
          >
            <List
              first={item.first_name + " " + item.last_name}
              second={item.occupation}
              third={item.email}
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


export default MyProviders;
