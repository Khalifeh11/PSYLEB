import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import LoginStack from "./LoginStack";
import TabNavigation from "./TabNavigation";
import { userContext, selectedProviderContext } from "../userContext";
import { useState } from "react";
import ProviderNavigation from './Provider/ProviderNavigation'

function StackSwitcher() {
  const [currentUser, setCurrentUser] = useState();
  const [selectedProvider, setSelectedProvider] = useState();
  return (
    <userContext.Provider value={{ currentUser, setCurrentUser }}>
    <selectedProviderContext.Provider value={{ selectedProvider, setSelectedProvider }}>
    <NavigationContainer>
      {!currentUser ? <LoginStack /> : currentUser.user.user_type == 1 ? <TabNavigation /> : <ProviderNavigation />}
    </NavigationContainer>
    </selectedProviderContext.Provider>
    </userContext.Provider>

  );
}

export default StackSwitcher;
