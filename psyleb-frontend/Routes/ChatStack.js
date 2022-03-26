import MyAppointments from "../screens/MyAppointments";
import MyProviders from "../screens/MyProviders";
import Chat from "../screens/Chat";
import MyChats from "../screens/MyChats";
import { createStackNavigator } from "@react-navigation/stack";

const ChatRoutes = () => {
  const ChatNavigation = createStackNavigator();
  return (
    <ChatNavigation.Navigator
      initialRouteName="MyChats"
      screenOptions={{
        headerShown: false,
      }}
    >
      <ChatNavigation.Screen
        name="MyChats"
        component={MyChats}
        options={{
          headerShown: true,
          title: "My Chats",
          headerStyle: {
            backgroundColor: "#5bb075",
          },
          headerTintColor: "#fff",
        }}
      />
      <ChatNavigation.Screen
        name="Chat"
        component={Chat}
      />
    </ChatNavigation.Navigator>
  );
};

export default ChatRoutes;
