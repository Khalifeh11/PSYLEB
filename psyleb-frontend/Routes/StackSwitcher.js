import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import Register from '../screens/Register';
import TabNavigation from "./TabNavigation";

function StackSwitcher() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      { false ? (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          </Stack.Navigator> 
          ) : (
            <TabNavigation />
          )
      }
    </NavigationContainer>
  );
}

export default StackSwitcher;
