import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

const LoginStack = () => {
    const LoginNavigation = createStackNavigator();
  return (
      <LoginNavigation.Navigator>
        <LoginNavigation.Screen name="Login" component={Login} />
        <LoginNavigation.Screen name="Register" component={Register} />
      </LoginNavigation.Navigator>
  );
};

export default LoginStack;
