import { useAuth } from "@/lib/auth-context";
import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";
import { Button, Card, Surface } from "react-native-paper";
import TambahHabitScreen from "./tambah-habit";
import CardTitle from "react-native-paper/lib/typescript/components/Card/CardTitle";
import { useEffect } from "react";
import { client } from "@/lib/appwrite";

export default function Index() {
  // buat variabel signOut dari useAuth
  const { signOut, user } = useAuth();

  const [habits, setHabits] = useState<Habit[]>();

  useEffect(() => {
    fetchHabits();

    const habitsSubsription = client.subscribe(`databases.${DATABASE_ID}.collections.${HABITS_COLLECTION_ID}.documents`)
  }, [user]);

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
      ) : (
        habits.map((habit, key) => (
          <Surface style={styles.card} elevation={0}>
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
          </Surface>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
    // justifyContent: "center",
    // alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontWeight: "bold",
  },
  card: {
    marginBottom: 18,
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardContent: {
    padding: 22,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#22223b",
  },
  cardDescription: {
    fontSize: 16,
    marginBottom: 15,
    color: "#6c6c80",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  streakBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ff9800",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  streakText: {
    marginLeft: 8,
    color: "#fff9800",
    fontWeight: "bold",
    fontSize: 14,
  },
  frequencyBadge: {
    backgroundColor: "#2196f3",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  frequencyText: {
    marginLeft: 8,
    color: "#7c4dff",
    fontWeight: "bold",
    fontSize: 14,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyStateText: {
    color: "#a51c31",
  },
  navButton: {
    width: 100,
    height: 20,
    backgroundColor: "coral",
    borderRadius: 8,
    textAlign: "center",
  },
});
