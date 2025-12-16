import { createContext, useContext, useEffect, useState } from "react";
import { ID, Models } from "react-native-appwrite";
import { account } from "./appwrite";

type AuthContextType = {
  user: Models.User<Models.Preferences> | null;
  signUp: (email: string, password: string) => Promise<string | null>;
  signIn: (email: string, password: string) => Promise<string | null>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export function AuthProvider({ children }: { children: React.ReactNode }) {
  // buat useState user untuk menyimpan data user
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);

  // buat useEffect untuk mendapatkan data user
  useEffect(() => {
    getUser();
  }, []);

  // buat fungsi getUser untuk mendapatkan data user
  const getUser = async () => {
    // panggil account.get dari appwrite
    try {
      const session = await account.get();
      setUser(session);
    } catch (error) {
      // jika error maka setUser null
      setUser(null);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      await account.create(ID.unique(), email, password);
      await signIn(email, password);
      return null;
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
      return "Terjadi kesalahan saat melakukan pendaftaran.";
    }
  };
  const signIn = async (email: string, password: string) => {
    try {
      await account.createEmailPasswordSession(email, password);
      return null;
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
      return "terjadi kesalahan saat masuk.";
    }
  };
  return <AuthContext.Provider value={{ signUp, signIn }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  // buat useContext untuk AuthContext agar bisa digunakan di komponen lain
  const context = useContext(AuthContext);
  //   kondisi ketika context undefined
  if (context === undefined) {
    throw new Error("useAuth seharusnya digunakan di dalam AuthProvider");
  }
  return context;
}
