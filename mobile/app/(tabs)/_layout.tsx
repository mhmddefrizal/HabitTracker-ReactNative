import { Tabs } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AntDesign from "@expo/vector-icons/AntDesign";
export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "coral" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
/**
 * A function that returns a React Element to be rendered as the icon for this tab.
 * It receives two props: color (string) and focused (boolean).
 * If focused is true, the icon should be rendered in the color provided.
 * If focused is false, the icon should be rendered in black color.
 */
          tabBarIcon: ({ color, focused }) => {
            {
              return focused ? <FontAwesome5 name="home" size={24} color={color} /> : <AntDesign name="home" size={24} color="black" />;
            }
          },
        }}
      />
      <Tabs.Screen name="login" options={{ title: "Login" }} />
    </Tabs>
  );
}
