import { createStackNavigator } from "@react-navigation/stack";
import Explore from "../screens/Explore";
import Provider from "../screens/ProviderProfile";

const ExploreRoutes = () => {
  const ExploreNavigation = createStackNavigator();
  return (
    <ExploreNavigation.Navigator
      initialRouteName="Explore"
      screenOptions={{
        headerShown: false,
      }}
    >
      <ExploreNavigation.Screen
        name="Explore"
        component={Explore}
      />
      <ExploreNavigation.Screen
        name="Provider"
        component={Provider}
      />
    </ExploreNavigation.Navigator>
  );
};

export default ExploreRoutes;
