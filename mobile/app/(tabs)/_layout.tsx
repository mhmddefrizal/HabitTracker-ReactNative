import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Tabs } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
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
          title: "Habit Hari Ini",
          tabBarIcon: ({ color, size }) => <FontAwesome5 name="calendar-day" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="streaks"
        options={{
          title: "Streaks",
          tabBarIcon: ({ color, size }) => <AntDesign name="line-chart" size={24} color="black" />,
        }}
      />
      <Tabs.Screen
        name="tambah-habit"
        options={{
          title: "Tambah Habit",
          tabBarIcon: ({ color, size }) => <AntDesign name="plus-circle" size={24} color="black" />,
        }}
      />
    </Tabs>
  );
}
