import ProviderProfile from "../../screens/ProviderScreens/ProviderProfile";
import ProviderAppointments from "../../screens/ProviderScreens/ProviderAppointments";
import MyClients from "../../screens/ProviderScreens/MyClients";
import ProviderSettings from "../../screens/ProviderScreens/ProviderSettings";
import ProviderChats from "../../screens/ProviderScreens/ProviderChats";
import { createStackNavigator } from "@react-navigation/stack";


const ProviderRoutes = () => {
  const ProviderNavigation = createStackNavigator();
  return (
    <ProviderNavigation.Navigator
      initialRouteName="ProviderProfile"
      screenOptions={{
        headerShown: false,
      }}
    >
      <ProviderNavigation.Screen
        name="ProviderProfile"
        component={ProviderProfile}
      />
      <ProviderNavigation.Screen
        name="ProviderSettings"
        component={ProviderSettings}
        options={{
          headerShown: true,
          title: "Settings",
          headerStyle: {
            backgroundColor: "#5bb075",
          },
          headerTintColor: "#fff",
        }}
      />
      <ProviderNavigation.Screen
        name="ProviderAppointments"
        component={ProviderAppointments}
        options={{
          headerShown: true,
          title: "My Appointments",
          headerStyle: {
            backgroundColor: "#5bb075",
          },
          headerTintColor: "#fff",
        }}
      />
      <ProviderNavigation.Screen
        name="MyClients"
        component={MyClients}
        options={{
          headerShown: true,
          title: "My Clients",
          headerStyle: {
            backgroundColor: "#5bb075",
          },
          headerTintColor: "#fff",
        }}
      />

      <ProviderNavigation.Screen
        name="ProviderChats"
        component={ProviderChats}
        options={{
          headerShown: true,
          title: "My Chats",
          headerStyle: {
            backgroundColor: "#5bb075",
          },
          headerTintColor: "#fff",
        }}
      />

    </ProviderNavigation.Navigator>
  );
};

export default ProviderRoutes;
