import { useAuth } from "@/lib/auth-context";
import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import TambahHabitScreen from "./tambah-habit";

export default function Index() {
  // buat variabel signOut dari useAuth
  const { signOut } = useAuth();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Agenda Hari Ini</Text>
        <Text>Lorem ipsum dolor sit amet.</Text>
        <Button mode="text" onPress={signOut} icon={"logout"}>
          {" "}
          Keluar{" "}
        </Button>
      </View>

      {habits?.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>Tidak ada agenda hari ini, tambah agenda pertamamu!</Text>
        </View>
      ): (
        habits.map((habit, key) => (
        <View key={key} style={styles.cardContent}>
          <Text style={styles.cardTitle}>
            {habit.title}
          </Text>
          <Text style={styles.cardDescription}>
            {habit.description}
          </Text>
          <View style={styles.cardFooter}>
            <View style={styles.streakBadge}>
              <MaterialCommunityIcon name="fire" size={18} color="#ff9800 ">

              </MaterialCommunityIcon>
              <Text style={styles.streakText}>
                {habit.streak_count} rentetan hari
              </Text>
            </View>
            <View style={styles.frequencyBadge}>
              <Text style={styles.frequencyText}>{habit.frequency.charAt(0).toUpperCase() + habit.frequency.slice(1)}</Text>
            </View>
          </View>
        </View>
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
