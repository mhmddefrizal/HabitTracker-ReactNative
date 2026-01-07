import { useAuth } from "@/lib/auth-context";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, SegmentedButtons, TextInput } from "react-native-paper";

const FREQUENCIES = ["harian", "mingguan", "bulanan"];
type Frequency = (typeof FREQUENCIES)[number];
export default function TambahHabitScreen() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [frequency, setFrequency] = useState<Frequency>("harian");
  const { user } = useAuth();

  const handleSubmit = async () => {
    if (!user) return;
  };

  return (
    <View style={styles.container}>
      <TextInput label="Title" mode="outlined" onChangeText={setTitle} style={styles.input} />
      <TextInput label="Description" mode="outlined" onChangeText={setDescription} style={styles.input} />
      <View style={styles.frequencyContainer}>
        <SegmentedButtons
          value={frequency}
          onValueChange={(value) => setFrequency(value as Frequency)}
          buttons={FREQUENCIES.map((freq) => ({
            value: freq,
            label: freq.charAt(0).toUpperCase() + freq.slice(1),
          }))}
        />
      </View>
      <Button mode="contained" onPress={handleSubmit} disabled={!title || !description}>
        Tambah Habit
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "f5f5f5",
    justifyContent: "center",
  },
  input: {
    marginBottom: 16,
  },
  frequencyContainer: {
    marginBottom: 24,
  },
});
