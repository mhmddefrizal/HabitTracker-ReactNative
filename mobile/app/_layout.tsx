import { AuthProvider, useAuth } from "@/lib/auth-context";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";

function RouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  // buat state user dari useAuth agar bisa digunakan di komponen lain
  const { user } = useAuth();

  // buat useEffect ketika user null maka redirect ke halaman /auth
  useEffect(() => {
    if (!user) {
      router.replace("/auth");
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
