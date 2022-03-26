import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import LoginStack from "./LoginStack";
import TabNavigation from "./TabNavigation";
import { userContext } from "../userContext";
import { useState } from "react";
import ProviderNavigation from './Provider/ProviderNavigation'

function StackSwitcher() {
  const [currentUser, setCurrentUser] = useState();
  return (
    <userContext.Provider value={{ currentUser, setCurrentUser }}>
    <NavigationContainer>
      {!currentUser ? <LoginStack /> : currentUser.user.user_type == 1 ? <TabNavigation /> : <ProviderNavigation />}
    </NavigationContainer>
    </userContext.Provider>

  );
}

export default StackSwitcher;
