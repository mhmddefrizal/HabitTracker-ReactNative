import { useAuth } from "@/lib/auth-context";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Databases, Query } from "react-native-appwrite";

export default function StreaksScreen() {
  // buat variabel habits
  const [habits, setHabits] = useState<Habit[]>();

  // buat variabel CompleteHabits
  const [CompleteHabits, setCompleteHabits] = useState<HabitCompletion[]>();

  // buat variabel user
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchHabits();
      fetchCompletions();
    }
  }, [user]);

  // buat fungsi fetchHabits
  const fetchHabits = async () => {
    // panggil Databases.listDocuments
    try {
      const response = await Databases.listDocuments(DATABASE_ID, HABITS_COLLECTION_ID, [Query.equal("user_id", user?.$id ?? "")]);
      setHabits(response.documents as Habit[]);
    } catch (error) {
      console.error(error);
    }
  };

  // buat fungsi fetchCompletion
  const fetchCompletions = async () => {
    try {
      const response = await Databases.listDocuments(DATABASE_ID, COMPLETIONS_COLLECTION_ID, [Query.equal("user_id", user?.$id ?? "")]);
      const completions = response.documents as HabitCompletion[];
      setCompleteHabits(completions);
    } catch (error) {
      console.error(error);
    }
  };

  interface StreakData {
    streak: number;
    bestStreak: number;
    total: number;
  }

  const getStreakData = (habitId: string) => {
    const habitCompletions = CompleteHabits?.filter((c) => c.habit_id === habitId).sort((a, b) => new Date(a.completed_at).getTime() - new Date(b.completed_at).getTime());

    if (habitCompletions?.length === 0) return {}
  };

  return (
    <View>
      <Text>Ini adalah halaman login</Text>
    </View>
  );
}
