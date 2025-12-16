import { AuthProvider, useAuth } from "@/lib/auth-context";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";

function RouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  // buat state user dari useAuth agar bisa digunakan di komponen lain
  const { user } = useAuth();

  // buat state segments dari useSegments agar bisa digunakan di komponen lain
  const segments = useSegments();

  // buat useEffect ketika user null maka redirect ke halaman /auth
  useEffect(() => {
    // cek apakah route berada di group auth
    const inAuthGroup = segments[0] === "auth";
    // jika user null dan tidak berada di group auth maka redirect ke halaman /auth
    if (!user && !inAuthGroup) {
      router.replace("/auth");
    } else if (user && inAuthGroup) {
      router.replace("/");
    }
  });

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RouteGuard>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </RouteGuard>
    </AuthProvider>
  );
}
