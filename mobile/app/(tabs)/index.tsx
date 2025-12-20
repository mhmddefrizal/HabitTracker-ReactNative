import { useAuth } from "@/lib/auth-context";
import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import TambahHabitScreen from "./tambah-habit";

export default function Index() {
  // buat variabel signOut dari useAuth
  const { signOut } = useAuth();
  return (
    <View style={styles.view}>
      <View>
        <Text>Agenda Hari Ini</Text>
        <Text>Lorem ipsum dolor sit amet.</Text>
        <Button mode="text" onPress={signOut} icon={"logout"}>
          {" "}
          Keluar{" "}
        </Button>
      </View>

      {TambahHabitScreen?.length === 0 ? (
        <View>
          <Text>Tidak ada agenda hari ini, tambah agenda pertamamu!</Text>
        </View>
      ): (
        TambahHabitScreen.map((habit, key) => <View> </View>
      )}
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
