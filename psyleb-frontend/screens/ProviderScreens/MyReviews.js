import {
  View,
  FlatList,
  Image, 
  StyleSheet,
} from "react-native";
import React from "react";
import { useState } from "react";
import IP from "../../globals/IP";
import List from "../../components/List";
import { useContext } from "react";
import { userContext } from "../../userContext";
import { useEffect } from "react";
import axios from "axios";


const MyReviews = () => {
  const { currentUser, setCurrentUser } = useContext(userContext);
  const [reviews, setReviews] = useState();

  const fetchMyReviews = async () => {
    const url = `${IP}/api/user/myReviews`;
    const token = currentUser.access_token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.get(url, config);
      const dataFetched = response.data;
      setReviews(dataFetched);
    } catch (error) {
      console.warn(error);
    }
  };



  useEffect(fetchMyReviews, []);
  return (
    <View>
      <FlatList
        data={reviews && reviews.reviews}
        key={(item) => item.id}
        renderItem={({ item }) => (
          <List
            // first={format(todayDate, "iii, dd MMM")}
            first={item.first_name + " " + item.last_name}
            second={item.text}
            third={item.text}
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

export default MyReviews;

