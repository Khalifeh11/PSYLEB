import React from "react";
import { useState, useContext } from "react";
import IP from "../globals/IP";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
  // Button
} from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import axios from "axios";
import { userContext } from "../userContext";
import PrimaryTextInput from "../components/PrimaryTextInput";
import { TextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Button } from "react-native-paper";
import PhoneInput from "react-native-phone-number-input";

const Settings = () => {
  const { currentUser, setCurrentUser } = useContext(userContext);

  // handling image upload

  const [image, setImage] = useState();
  const [base64Img, setbase64Img] = useState();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      setbase64Img(result.base64);
    }
  };

  const updateImg = async () => {
    const url = "http://192.168.0.109:8000/api/user/addPicture";
    const token = currentUser.access_token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const imagetoSend = {
      image: base64Img,
    };

    try {
      const response = await axios.post(url, imagetoSend, config);
      const responseData = response.data;
      setCurrentUser({
        ...currentUser,
        user: {
          ...currentUser.user,
          profile_pic: responseData.profile_pic,
        },
      });

      Alert.alert("Image Uploaded");
    } catch (er) {
      console.warn(er);
    }
  };

  // profile data update

  const token = currentUser.access_token;

  const updateProfileAPI = `${IP}/api/user/edit-profile`;

  const [profiledata, setProfileData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    bio: "",
    phone_number: "",
  });

  // handling first name
  const handleFirstName = (value) => {
    setProfileData({
      ...profiledata,
      first_name: value,
    });
  };

  // handling last name
  const handleLastName = (value) => {
    setProfileData({
      ...profiledata,
      last_name: value,
    });
  };

  // handling email
  const handleEmail = (value) => {
    setProfileData({
      ...profiledata,
      email: value,
    });
  };

  // handling bio
  const handleBio = (value) => {
    setProfileData({
      ...profiledata,
      bio: value,
    });
  };

  // handling phone number
  const handlePhone = (value) => {
    setProfileData({
      ...profiledata,
      phone_number: value,
    });
  };

  // async function to update profile

  const updateProfile = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    // first_name= currentUser.user.first_name,
    const userData = {
      first_name: profiledata.first_name,
      last_name: profiledata.last_name,
      email: profiledata.email,
      bio: profiledata.bio,
      phone_number: profiledata.phone_number,
    };

    userData.first_name == ""
      ? (userData.first_name = currentUser.user.first_name)
      : (userData.first_name = profiledata.first_name);

    userData.last_name == ""
      ? (userData.last_name = currentUser.user.last_name)
      : (userData.last_name = profiledata.last_name);

    userData.email == ""
      ? (userData.email = currentUser.user.email)
      : (userData.email = profiledata.email);

    userData.bio == ""
      ? (userData.bio = currentUser.user.bio)
      : (userData.bio = profiledata.bio);

    userData.phone_number == ""
      ? (userData.phone_number = currentUser.user.phone_number)
      : (userData.phone_number = profiledata.phone_number);

    try {
      if (currentUser.user.bio == null && userData.bio == null) {
        userData.bio = "";
      }
      if (
        currentUser.user.phone_number == null &&
        userData.phone_number == null
      ) {
        Alert.alert("Make sure you have phone number");
      } else {
        const response = await axios.post(updateProfileAPI, userData, config);
        const dataFetched = response.data;
        setCurrentUser({
          ...currentUser,
          user: {
            ...currentUser.user,
            first_name: dataFetched.user.first_name,
            last_name: dataFetched.user.last_name,
            email: dataFetched.user.email,
            bio: dataFetched.user.bio,
            phone_number: dataFetched.user.phone_number,
          },
        });
        Alert.alert("Profile Updated");
      }
    } catch (error) {
      console.warn(userData);
    }
  };
  const logout = () => setCurrentUser(null);

  // console.warn(`${IP}/public${currentUser.user.profile_pic}`)

  return (
    <View style={styles.container}>
      {/* image section  */}
      <View style={styles.imgContainer}>
        {currentUser.user.profile_pic == null ? (
          <Image
            source={{
              uri: "https://ca.slack-edge.com/T0NC4C7NK-U039444J2UR-g1e75ab176a1-512",
            }} //http://192.168.1.95:8000
            style={styles.profileImage}
          />
        ) : (
          <Image
            source={{
              uri: `${IP}${currentUser.user.profile_pic}`,
            }}
            style={styles.profileImage}
          />
        )}

        <TouchableOpacity onPress={pickImage} style={{ bottom: 30, left: 30 }}>
          <Ionicons name="md-create" size={30} color="black" />
        </TouchableOpacity>

        <View style={styles.imgBtnContainer}>
          <Button
            mode="text"
            onPress={updateImg}
            style={styles.imgBtn}
            color="#008080"
          >
            Save
          </Button>
        </View>
        {/* <Button title="confirm upload" onPress={updateImg}/> */}
      </View>

      {/* first name section */}

      <View>
        <TextInput
          label={"First Name"}
          selectionColor={"green"}
          underlineColor={"black"}
          activeUnderlineColor={"green"}
          onChangeText={handleFirstName}
          defaultValue={currentUser.user.first_name}
          value={profiledata.first_name}
          left={<TextInput.Icon name="account-circle" />}
        />
      </View>

      {/* last name section */}

      <View>
        <TextInput
          label={"Last Name"}
          selectionColor={"green"}
          underlineColor={"black"}
          activeUnderlineColor={"green"}
          onChangeText={handleLastName}
          defaultValue={currentUser.user.last_name}
          value={profiledata.last_name}
          left={<TextInput.Icon name="account-circle" />}
        />
      </View>

      {/* email section */}

      <View>
        <TextInput
          label={"Email"}
          selectionColor={"green"}
          underlineColor={"black"}
          activeUnderlineColor={"green"}
          onChangeText={handleEmail}
          defaultValue={currentUser.user.email}
          value={profiledata.email}
          left={<TextInput.Icon name="email" />}
        />
      </View>

      {/* bio section */}

      <View>
        <TextInput
          label={"Phone number"}
          selectionColor={"green"}
          underlineColor={"black"}
          activeUnderlineColor={"green"}
          onChangeText={handlePhone}
          defaultValue={currentUser.user.phone_number}
          value={profiledata.phone_number}
          left={<TextInput.Icon name="phone" />}
        />
        {/* <PhoneInput
          style={{ width: 100 }}
          value={profiledata.phone_number}
          onChangePhoneNumber={handlePhone}
          defaultCode={"LB"}
          onChangeText={handlePhone}
          underlineColor={"black"}
          selectionColor={"green"}
        /> */}
      </View>

      {/* bio section */}

      <View>
        <TextInput
          label={"Bio"}
          selectionColor={"green"}
          underlineColor={"black"}
          activeUnderlineColor={"green"}
          multiline={true}
          onChangeText={handleBio}
          defaultValue={currentUser.user.bio}
          value={profiledata.bio}
          left={<TextInput.Icon name="text" />}
        />
      </View>

      {/*Buttons */}

      <View style={styles.saveBtn}>
        <PrimaryButton text={"Save"} job={updateProfile} color={"#042a2b"} />
      </View>

      <View style={styles.logoutBtn}>
        <PrimaryButton text={"logout"} job={logout} color={"#d84727"} />
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  saveBtn: {
    marginTop: 20,
    alignSelf: "center",
  },

  logoutBtn: {
    alignSelf: "center",
  },

  container: {
    marginHorizontal: 20,
    marginTop: 30,
  },

  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: "#5DB075",
    marginTop: 20,
  },

  imgContainer: {
    alignItems: "center",
    marginBottom: 20,
    marginTop: -20,
    // backgroundColor: 'red',
    alignItems: "center",
  },

  imgBtnContainer: {
    alignItems: "center",
    marginTop: -30,
  },

  // imgBtn: {},
});
