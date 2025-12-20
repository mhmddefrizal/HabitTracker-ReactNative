import { useAuth } from "@/lib/auth-context";
import { Link } from "expo-router";
import { Text,View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

export default function Index() {
  // buat variabel signOut dari useAuth
  const { signOut } = useAuth();
  return (
    <View style={styles.view}>
      {/* <Text>Lorem ipsum dolor sit amet.</Text>
      <Button mode="text" onPress={signOut} icon={"logout"}>
        {" "}
        Keluar{" "}
      </Button> */}
      <View>
        <Text>Agenda Hari Ini</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  navButton: {
    width: 100,
    height: 20,
    backgroundColor: "coral",
    borderRadius: 8,
    textAlign: "center",
  },
});
