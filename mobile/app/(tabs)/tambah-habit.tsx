import { Text, View } from "react-native";
import { SegmentedButtons, TextInput } from "react-native-paper";

const FREQUENCIES = ["harian", "mingguan", "bulanan"];
export default function TambahHabitScreen() {
  return (
    <View>
      <TextInput label="Title" mode="outlined" />
      <TextInput label="Description" mode="outlined" />
      <View>
        <SegmentedButtons
          buttons={FREQUENCIES.map((freq) => ({
            value: freq,
            label: freq.charAt(0).toUpperCase() + freq.slice(1),
          }))}
        />
      </View>
    </View>
  );
}
