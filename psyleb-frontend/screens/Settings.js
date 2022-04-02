import React from "react";
import { useState, useContext } from "react";
import IP from "../globals/IP";
import { View, Text, StyleSheet } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import axios from "axios";
import { userContext } from "../userContext";
import PrimaryTextInput from "../components/PrimaryTextInput";
import { TextInput } from "react-native-paper";
const Settings = () => {
  const { currentUser, setCurrentUser } = useContext(userContext);
  const token = currentUser.access_token;
  const updateProfileAPI = `${IP}/api/user/edit-profile`;

  const [profiledata, setProfileData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    bio: "",
  });

  const handleFirstName = (value) => {
    setProfileData({
      ...profiledata,
      first_name: value,
    });
  };

  const handleLastName = (value) => {
    setProfileData({  
      ...profiledata,
      last_name: value,
    });
  };

  const handleEmail = (value) => {
    setProfileData({
      ...profiledata,
      email: value,
    });
  };

  const handlePassword = (value) => {
    setProfileData({
      ...profiledata,
      password: value,
    });
  };

  const handlePasswordConfirmation = (value) => {
    setProfileData({
      ...profiledata,
      password_confirmation: value,
    });
  };

  const handleBio = (value) => {
    setProfileData({
      ...profiledata,
      bio: value,
    });
  };

  const updateProfile = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
    }
  };
    // first_name= currentUser.user.first_name,
    const user = {
      first_name: profiledata.first_name,
      last_name: profiledata.last_name,
      email: profiledata.email,
      password: profiledata.password,
      password_confirmation: profiledata.password_confirmation,
      bio: profiledata.bio,
    };
    try {
      const response = await axios.post(updateProfileAPI, user, config);
      const dataFetched = response.data;
      setCurrentUser(dataFetched);
      // console.warn(currentUser)
//     for (const key in user) {
//       if(user[key] === ''){
//         key=== 'first_name' ? handleFirstName(currentUser.user.first_name) :
//         key=== 'last_name' ? handleLastName(currentUser.user.last_name) :
//         key=== 'email' ? handleEmail(currentUser.user.email) :
//         key=== 'bio' ? handleBio(currentUser.user.bio) :
//         console.log(key)
//   }
// }

    } catch (error) {
      console.warn(error);
    }
  };

  const logout = () => setCurrentUser(null);
  return (
    <View style={styles.container}>
      <View>
        <TextInput
          label={"First Name"}
          selectionColor={"green"}
          underlineColor={"black"}
          activeUnderlineColor={"green"}
          onChangeText={handleFirstName}
          defaultValue={currentUser.user.first_name}
          value={profiledata.first_name}
        />
      </View>
      <View>
        <TextInput
          label={"Last Name"}
          selectionColor={"green"}
          underlineColor={"black"}
          activeUnderlineColor={"green"}
          onChangeText={handleLastName}
          defaultValue={currentUser.user.last_name}
          value={profiledata.last_name}
        />
      </View>
      <View>
        <TextInput
          label={"Email"}
          selectionColor={"green"}
          underlineColor={"black"}
          activeUnderlineColor={"green"}
          onChangeText={handleEmail}
          defaultValue={currentUser.user.email}
          value={profiledata.email}
        />
      </View>
      <View>
        <TextInput
          label={"Password"}
          selectionColor={"green"}
          underlineColor={"black"}
          activeUnderlineColor={"green"}
          onChangeText={handlePassword}
          // value={currentUser.user.password}
          // defaultValue={currentUser.user.password}
        />
      </View>
      <View>
        <TextInput
          label={"Confirm Password"}
          selectionColor={"green"}
          underlineColor={"black"}
          activeUnderlineColor={"green"}
          onChangeText={handlePasswordConfirmation}
          // value={currentUser.user.password_confirmation}
          // defaultValue={currentUser.user.password_confirmation}
        />
      </View>
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
        />
      </View>
      <View style={styles.logoutButton}>
        <PrimaryButton text={"Save"} job={updateProfile} color={"#5DB075"}/>
      </View>

      <View style={styles.logoutButton}>
        <PrimaryButton text={"logout"} job={logout} color={'#5DB075'}/>
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  logoutButton: {
    marginTop: 20,
    alignSelf: "center",
  },
});
