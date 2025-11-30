import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";

import { Button, Text, TextInput } from "react-native-paper";

export default function AuthScreen() {
  // buat useState Sign Up
  const [isSignUp, setIsSignUp] = useState<boolean>(false);

  // buat fungsi handleSwitchMode
  const handleSwitchMode = () => {
    setIsSignUp((prev) => !prev);
  };
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <View style={styles.content}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
});
