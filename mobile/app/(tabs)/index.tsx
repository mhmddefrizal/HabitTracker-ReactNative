import { useAuth } from "@/lib/auth-context";
import { Link } from "expo-router";
import { View, StyleSheet, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button, Text, Card, Surface } from "react-native-paper";
import TambahHabitScreen from "./tambah-habit";
import CardTitle from "react-native-paper/lib/typescript/components/Card/CardTitle";
import { useEffect, useRef, useState } from "react";
import { client, COMPLETIONS_TABLE_ID, DATABASE_ID, databases, HABITS_TABLE_ID, RealtimeResponse } from "@/lib/appwrite";
import { Swipeable } from "react-native-gesture-handler";
import { Databases, ID, Query, RealtimeResponseEvent } from "react-native-appwrite";
import { Habit, HabitCompletion } from "@/types/database.type";

export default function Index() {
  // buat variabel signOut dari useAuth
  const { signOut, user } = useAuth();

  // buat variabel habits
  const [habits, setHabits] = useState<Habit[]>([]);

  // buat variabel CompleteHabits
  const [completedHabits, setCompletedHabits] = useState<string[]>();

  const swipeableRef = useRef<{ [key: string]: Swipeable | null }>({});

  useEffect(() => {
    if (user) {
      const habitChannel = `databases.${DATABASE_ID}.collections.${HABITS_TABLE_ID}.documents`;
      const habitsSubsription = client.subscribe(habitChannel, (response: RealtimeResponse) => {
        if (response.events.includes("databases.*.collections.*.documents.*.create")) {
          fetchHabits();
        } else if (response.events.includes("databases.*.collections.*.documents.*.update")) {
          fetchHabits();
        } else if (response.events.includes("databases.*.collections.*.documents.*.delete")) {
          fetchHabits();
        }
      });

      const completionsChannel = `databases.${DATABASE_ID}.collections.${COMPLETIONS_TABLE_ID}.documents`;
      const completionsSubsription = client.subscribe(completionsChannel, (response: RealtimeResponse) => {
        if (response.events.includes("databases.*.collections.*.documents.*.create")) {
          fetchTodayCompletion();
        }
      });

      fetchHabits();
      fetchTodayCompletion();

      return () => {
        habitsSubsription();
        completionsSubsription();
      };
    }
  }, [user]);

  // buat fungsi fetchHabits
  const fetchHabits = async () => {
    // panggil Databases.listDocuments
    try {
      const response = await databases.listDocuments(DATABASE_ID, HABITS_TABLE_ID, [Query.equal("user_id", user?.$id ?? "")]);
      setHabits(response.documents as unknown as Habit[]);
    } catch (error) {
      console.error(error);
    }
  };

  // buat fungsi fetchTodayCompletion
  const fetchTodayCompletion = async () => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const response = await databases.listDocuments(DATABASE_ID, COMPLETIONS_TABLE_ID, [Query.equal("user_id", user?.$id ?? ""), Query.greaterThanEqual("completed_at", today.toISOString())]);
      const completions = response.documents as unknown as HabitCompletion[];
      setCompletedHabits(completions.map((c) => c.habit_id));
    } catch (error) {
      console.error(error);
    }
  };

  // buat fungsi DeleteHabit
  const handleDeleteHabit = async (id: string) => {
    // panggil Databases.deleteDocument
    try {
      await databases.deleteDocument(DATABASE_ID, HABITS_TABLE_ID, id);
    } catch (error) {
      console.error(error);
    }
  };

  // buat fungsi CompleteHabit
  const handleCompleteHabit = async (id: string) => {
    if (!user || completedHabits?.includes(id)) return;
    // panggil Databases.createDocument
    try {
      const currentDate = new Date().toISOString();
      await databases.createDocument(DATABASE_ID, COMPLETIONS_TABLE_ID, ID.unique(), {
        habit_id: id,
        user_id: user.$id,
        completed_at: currentDate,
      });

      // panggil Databases.getDocument
      const habit = habits.find((h) => h.$id === id);
      if (!habit) return;

      // panggil Databases.updateDocument
      await databases.updateDocument(DATABASE_ID, HABITS_TABLE_ID, id, {
        streak_count: (habit.streak_count ?? 0) + 1,
        last_completed_at: currentDate,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // buat fungsi isHabitComplete
  const isHabitCompleted = (habitId: string) => completedHabits?.includes(habitId);

  // buat fungsi swipe ke kanan
  const renderRightActions = (habitId: string) => (
    // buat swipe action
    <View style={styles.swipeActionRight}>{isHabitCompleted(habitId) ? <Text style={{ color: "white" }}>Selesai!</Text> : <MaterialCommunityIcons name="check-circle-outline" size={32} color="white" />}</View>
  );

  // buat fungsi swipe ke kiri
  const renderLeftActions = () => (
    // buat swipe action
    <View style={styles.swipeActionLeft}>
      <MaterialCommunityIcons name="trash-can-outline" size={32} color="white" />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Habit Hari Ini</Text>
        <Text>Lorem ipsum dolor sit amet.</Text>
        <Button mode="text" onPress={signOut} icon={"logout"}>
          Keluar
        </Button>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {habits?.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>Tidak ada habit hari ini, tambah habit pertamamu!</Text>
          </View>
        ) : (
          habits.map((habit, key) => (
            <Swipeable
              ref={(ref) => {
                swipeableRef.current[habit.$id] = ref;
              }}
              key={key}
              overshootLeft={false}
              overshootRight={false}
              renderRightActions={() => renderRightActions(habit.$id)}
              renderLeftActions={renderLeftActions}
              onSwipeableOpen={(direction) => {
                // buat swipe action
                if (direction === "right") {
                  handleDeleteHabit(habit.$id);
                } else if (direction === "left") {
                  handleCompleteHabit(habit.$id);
                }

                swipeableRef.current[habit.$id]?.close();
              }}
            >
              <Surface style={[styles.card, isHabitCompleted(habit.$id) && styles.cardCompleted]} elevation={0}>
                <View key={key} style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{habit.title}</Text>
                  <Text style={styles.cardDescription}>{habit.description}</Text>
                  <View style={styles.cardFooter}>
                    <View style={styles.streakBadge}>
                      <MaterialCommunityIcons name="fire" size={18} color="#ff9800" />
                      <Text style={styles.streakText}>{habit.streak_count} rentetan hari</Text>
                    </View>
                    <View style={styles.frequencyBadge}>
                      <Text style={styles.frequencyText}>{habit.frequency.charAt(0).toUpperCase() + habit.frequency.slice(1)}</Text>
                    </View>
                  </View>
                </View>
              </Surface>
            </Swipeable>
          ))
        )}
      </ScrollView>
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
  cardCompleted: {
    opacity: 0.5,
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
  swipeActionLeft: {
    flex: 1,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "flex-start",
    borderRadius: 18,
    marginBottom: 18,
    marginTop: 2,
    marginLeft: 16,
  },
  swipeActionRight: {
    flex: 1,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "flex-end",
    borderRadius: 18,
    marginBottom: 18,
    marginTop: 2,
    marginRight: 16,
  },
});
