import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Tabs } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: "#f5f5f5" },
        headerShadowVisible: false,
        tabBarStyle: { backgroundColor: "#f5f5f5", borderTopWidth: 0, elevation: 0, shadowOpacity: 0 },
        tabBarActiveTintColor: "#6200ee",
        tabBarInactiveTintColor: "#666",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Kebiasaan Hari Ini",
          tabBarIcon: ({ color, focused }) => <FontAwesome5 name="calendar-day" />,
        }}
      />
      <Tabs.Screen
        name="login"
        options={{
          title: "Login",
          tabBarIcon: ({ color, focused }) => {
            return focused ? <Entypo name="login" size={24} color={color} /> : <MaterialIcons name="login" size={24} color="black" />;
          },
        }}
      />
    </Tabs>
  );
}
