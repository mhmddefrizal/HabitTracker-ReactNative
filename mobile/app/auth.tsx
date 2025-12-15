import { useAuth } from "@/lib/auth-context";
import { useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";

export default function AuthScreen() {
  // buat useState Sign Up
  const [isSignUp, setIsSignUp] = useState<boolean>(false);

  // buat useState email dan password
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // buat useState error
  const [error, setError] = useState<string | null>("");

  // buat theme
  const theme = useTheme();

  // buat router untuk navigasi
  const router = useRouter();

  // buat panggil signIn dan signUp dari useAuth
  const { signIn, signUp } = useAuth();

  // buat fungsi handleAuth
  const handleAuth = async () => {
    if (!email || !password) {
      setError("Email dan password harus diisi");
      return;
    }

    if (password.length < 6) {
      setError("Password harus lebih dari 6 karakter");
      return;
    }

    setError(null);

    // buat kondisi ketika isSignUp true
    if (isSignUp) {
      const error = await signUp(email, password);
      // jika error maka setError
      if (error) {
        setError(error);
        return;
      }
    }
    // jika false maka panggil signIn
    else {
      const error = await signIn(email, password);
      // jika error maka setError
      if (error) {
        setError(error);
        return;
      }
      // jika berhasil maka navigasi ke halaman utama
      router.replace("/");
    }
  };

  // buat fungsi handleSwitchMode
  const handleSwitchMode = () => {
    setIsSignUp((prev) => !prev);
  };
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title} variant="headlineMedium">
          {" "}
          {isSignUp ? "Buat Akun" : "Selamat datang kembali"}
        </Text>

        <TextInput label="Email" autoCapitalize="none" keyboardType="email-address" placeholder="example@gmail.com" mode="outlined" style={styles.input} onChangeText={setEmail} />

        <TextInput label="Password" autoCapitalize="none" mode="outlined" secureTextEntry style={styles.input} onChangeText={setPassword} />

        {error && <Text style={{ color: theme.colors.error }}>{error}</Text>}

        <Button mode="contained" style={styles.button} onPress={handleAuth}>
          {isSignUp ? "Daftar Akun" : "Masuk"}
        </Button>
        <Button mode="text" onPress={handleSwitchMode} style={styles.switchModeButton}>
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
  title: {
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
  switchModeButton: {
    marginTop: 16,
  },
});
