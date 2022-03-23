import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from '../screens/Login'
import Register from '../screens/Register'

const LoginStack = () => {
    const LoginNavigation = createStackNavigator();
  return (
      <LoginNavigation.Navigator>
        <LoginNavigation.Screen name="Login" component={Login} options={{
          headerShown: false
        }}/>
        <LoginNavigation.Screen name="Register" component={Register} />
      </LoginNavigation.Navigator>
  );
};

export default LoginStack;
