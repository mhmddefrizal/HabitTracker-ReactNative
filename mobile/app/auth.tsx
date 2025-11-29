import { KeyboardAvoidingView, Platform, View } from "react-native";

import { Button, Text, TextInput } from "react-native-paper";

export default function AuthScreen() {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View>
        <Text>Buat Akun</Text>

        <TextInput label="Email" autoCapitalize="none" keyboardType="email-address" placeholder="example@gmail.com" mode="outlined" />

        <TextInput label="Password" autoCapitalize="none" keyboardType="email-address" mode="outlined" />

        <Button mode="contained">Daftar Akun</Button>
        <Button mode="text">Sudah punya akun? Masuk</Button>
      </View>
    </KeyboardAvoidingView>
  );
}
