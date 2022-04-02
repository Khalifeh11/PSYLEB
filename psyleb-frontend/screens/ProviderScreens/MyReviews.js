import {
  View,
  FlatList,
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
      // console.warn(reviews)
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
            image={require("../../assets/profile.jpg")}
          />
        )}
      />
    </View>
  );
};

export default MyReviews;

