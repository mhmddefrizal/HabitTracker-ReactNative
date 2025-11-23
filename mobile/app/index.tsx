import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Lorem ipsum dolor sit amet.</Text>
      <Link href="/login">Halaman Login</Link>
    </View>
  );
}
