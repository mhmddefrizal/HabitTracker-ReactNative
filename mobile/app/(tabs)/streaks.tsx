import { useAuth } from "@/lib/auth-context";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function StreaksScreen() {

    // buat variabel habits
  const [habits, setHabits] = useState<Habit[]>();

  // buat variabel CompleteHabits
  const [CompleteHabits, setCompleteHabits] = useState<HabitCompletion[]>();

  // buat variabel user
  const {user} = useAuth(); 

  useEffect(() => {
    if (user) {
      const channel = `databases.${DATABASE_ID}.collections.${HABITS_COLLECTION_ID}.documents`
      const habitsSubsription = client.subscribe(
        channel,
        (response: RealtimeResponse) => {
          if (response.events.includes('databases.*.collections.*.documents.*.create')) {
            fetchHabits();
          } else if (response.events.includes('databases.*.collections.*.documents.*.update')) {
            fetchHabits();
          } else if (response.events.includes('databases.*.collections.*.documents.*.delete')) {
            fetchHabits();
          }
        }
      );
      fetchHabits();

      return () => {
        habitsSubsription();
      }
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


  // buat fungsi fetchTodayCompletion
  const fetchTodayCompletion = async () => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const response = await Databases.listDocuments(DATABASE_ID, COMPLETIONS_COLLECTION_ID,
        [Query.equal("user_id", user?.$id ?? ""),
        Query.greaterThanEqual("completed_at", today.toISOString())
        ]);
      setHabits(response.documents as Habit[]);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <View>
      <Text>Ini adalah halaman login</Text>
    </View>
  );
}
