import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import LoginStack from "./LoginStack";
import TabNavigation from "./TabNavigation";

function StackSwitcher() {
  return (
    <NavigationContainer>
      {false ? <LoginStack /> : <TabNavigation />}
    </NavigationContainer>
  );
}

export default StackSwitcher;
