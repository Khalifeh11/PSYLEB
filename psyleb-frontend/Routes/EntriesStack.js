import { createStackNavigator } from "@react-navigation/stack";
import MyLogs from "../screens/MyLogs";
import MyCharts from "../screens/MyCharts";

const EntriesRoute = () => {
  const EntriesNavigation = createStackNavigator();
  return (
    <EntriesNavigation.Navigator
      initialRouteName="MyLogs"
      screenOptions={{
        headerShown: false,
      }}
    >
      <EntriesNavigation.Screen
        name="MyLogs"
        component={MyLogs}
      />
      <EntriesNavigation.Screen
        name="MyCharts"
        component={MyCharts}
        options={{
            headerShown: true,
            headerTitle: "Mood Logs",
            headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 20,
                color:"white"
            },
            headerStyle: {
                backgroundColor: "#5DB075",
            },
        }}
      />
    </EntriesNavigation.Navigator>
  );
};

export default EntriesRoute;
