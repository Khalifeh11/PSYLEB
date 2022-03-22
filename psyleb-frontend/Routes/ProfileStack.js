import MyAppointments from "../screens/MyAppointments";
import MyProviders from "../screens/MyProviders";
import Profile from "../screens/Profile";
import { createStackNavigator } from "@react-navigation/stack";

const ProfileRoutes = () => {
  const ProfileNavigation = createStackNavigator();
  return (
    <ProfileNavigation.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerShown: false,
      }}
    >
      <ProfileNavigation.Screen name="Profile" component={Profile} />
      <ProfileNavigation.Screen
        name="MyAppointments"
        component={MyAppointments}
        options={{
          headerShown: true,
          title: "My Appointments",
          headerStyle: {
            backgroundColor: "#5bb075",
          },
          headerTintColor: "#fff",
        }}
      />
      <ProfileNavigation.Screen
        name="MyProviders"
        component={MyProviders}
        options={{
          headerShown: true,
          title: "My Providers",
          headerStyle: {
            backgroundColor: "#5bb075",
          },
          headerTintColor: "#fff",
        }}
      />
    </ProfileNavigation.Navigator>
  );
};

export default ProfileRoutes;
