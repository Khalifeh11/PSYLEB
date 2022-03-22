import MyAppointments from "../screens/MyAppointments";
import MyProviders from "../screens/MyProviders";
import Profile from "../screens/Profile";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from '@react-navigation/stack';

const ProfileRoutes = () => {
  const ProfileNavigation = createStackNavigator();
  return (
    <ProfileNavigation.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerMode: "screen",
        headerTintColor: "black",
        headerStyle: { backgroundColor: "white" },
      }}
    >
      <ProfileNavigation.Screen name="Profile" component={Profile} />
      <ProfileNavigation.Screen
        name="MyAppointments"
        component={MyAppointments}
      />
      <ProfileNavigation.Screen name="MyProviders" component={MyProviders} />
    </ProfileNavigation.Navigator>
  );
};

export default ProfileRoutes;
