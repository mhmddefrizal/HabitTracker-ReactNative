import { Tabs } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "coral" }}>
      <FontAwesome5 name="home" size={24} color="black" />
      <Tabs.Screen name="index" options={{ title: "Home", tabBarIcon: () => <FontAwesome5 name="home" size={24} color="black" /> }} />
      <Tabs.Screen name="login" options={{ title: "Login" }} />
    </Tabs>
  );
}
