import React from "react";
import { useState, useContext } from "react";
import IP from '../globals/IP'
import PrimaryButton from "../components/PrimaryButton";
import axios from "axios";
import { userContext } from "../userContext";
const Settings = () => {
  const { currentUser, setCurrentUser } = useContext(userContext);
  const token = currentUser.access_token;
  const logoutAPI = `${IP}/api/auth/logout`;

  // const showme = ()=>console.warn(token)

  // const logoutfetch = async () => {
  //   const config = {
  //     headers: { Authorization: `Bearer ${token}` },
  //   };
  //   const bodyParameters = {};
  //   try {
  //     const response = await axios.post(logoutAPI, bodyParameters, config);
  //     const data = await response.data;
  //     console.warn(data)
  //   } catch (error) {
  //     console.log("logout error", error);
  //     console.warn(error)
  //   }
  // };

  const logout = () => setCurrentUser(null)
  return <PrimaryButton text={"logout"} job={logout} />;
};

export default Settings;
