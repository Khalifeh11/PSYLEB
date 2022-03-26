import * as React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Health from "../screens/Health";
import Chat from "../screens/Chat";
import MyChats from "../screens/MyChats";
import Explore from "../screens/Explore";
import Notifications from "../screens/Notifications";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import ProfileRoutes from "./ProfileStack";
import ChatRoutes from "./ChatStack";

const TabNavigation = () => {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Health"
      activeColor="rgba(246, 246, 246, 1)"
      inactiveColor="rgba(246, 246, 246, 0.65)"
      barStyle={{ backgroundColor: "#5DB075", height: 60 }}
    >
      <Tab.Screen
        name="Health"
        component={Health}
        options={{
          tabBarLabel: "Health",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="heartbeat" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Chats"
        component={ChatRoutes}
        options={{
          tabBarLabel: "Chat",
          tabBarIcon: ({ color }) => (
            <Entypo name="chat" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{
          tabBarLabel: "Explore",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="explore" size={24} color={color} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarLabel: "Notifications",
          tabBarIcon: ({ color }) => (
            <Ionicons name="notifications" size={24} color={color} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="ProfileRoutes"
        component={ProfileRoutes}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user-circle" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;

