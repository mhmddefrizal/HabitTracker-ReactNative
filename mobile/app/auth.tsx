import { useState } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";

import { Button, Text, TextInput } from "react-native-paper";

export default function AuthScreen() {
  // buat useState Sign Up
  const [isSignUp, setIsSignUp] = useState<boolean>(false);

  // buat fungsi handleSwitchMode
  const handleSwitchMode = () => {
    setIsSignUp((prev) => !prev);
  };
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View>
        <Text>{isSignUp ? "Buat Akun" : "Selamat datang kembali"}</Text>

        <TextInput label="Email" autoCapitalize="none" keyboardType="email-address" placeholder="example@gmail.com" mode="outlined" />

        <TextInput label="Password" autoCapitalize="none" keyboardType="email-address" mode="outlined" />

        <Button mode="contained">{isSignUp ? "Daftar Akun" : "Masuk"}</Button>
        <Button mode="text" onPress={handleSwitchMode}>
          {isSignUp ? "Sudah punya akun? Masuk" : "Belum punya akun? Daftar"}
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}
