import { createContext, useContext, useEffect, useState } from "react";
import { ID, Models } from "react-native-appwrite";
import { account } from "./appwrite";

type AuthContextType = {
  // buat user dan isLoadingUser untuk menyimpan data user dan status loading
  user: Models.User<Models.Preferences> | null;
  isLoadingUser: boolean;

  // buat fungsi signUp dan signIn untuk mendaftar dan masuk
  signUp: (email: string, password: string) => Promise<string | null>;
  signIn: (email: string, password: string) => Promise<string | null>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export function AuthProvider({ children }: { children: React.ReactNode }) {
  // buat useState user untuk menyimpan data user
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);

  // buat useState isLoadingUser untuk menyimpan status loading
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);

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
    } finally {
      // set isLoadingUser false
      setIsLoadingUser(false);
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
  return <AuthContext.Provider value={{ user, isLoadingUser, signUp, signIn }}>{children}</AuthContext.Provider>;
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
