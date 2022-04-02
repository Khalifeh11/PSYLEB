import Health from "../screens/Health";
import MyLogs from "../screens/MyLogs";
import { createStackNavigator } from "@react-navigation/stack";

const HealthRoutes = () => {
  const HealthNavigation = createStackNavigator();
  return (
    <HealthNavigation.Navigator
      initialRouteName="Health"
      screenOptions={{
        headerShown: false,
      }}
    >
      <HealthNavigation.Screen
        name="Health"
        component={Health}
      />
      <HealthNavigation.Screen
        name="MyLogs"
        component={MyLogs}
        options={{
            headerShown: true,
            title: "My Logs",
            headerStyle: {
              backgroundColor: "#5bb075",
            },
            headerTintColor: "#fff",
          }}
      />
    </HealthNavigation.Navigator>
  );
};

export default HealthRoutes;
