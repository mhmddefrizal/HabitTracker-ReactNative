import { Tabs } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerStyle: { backgroundColor: "#f5f5f5" }, headerShadowVisible: false, tabBarStyle: { backgroundColor: "#f5f5f5", borderTopWidth: 0, elevation: 0, shadowOpacity: 0 } }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => {
            {
              return focused ? <FontAwesome5 name="home" size={24} color={color} /> : <AntDesign name="home" size={24} color="black" />;
            }
          },
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
