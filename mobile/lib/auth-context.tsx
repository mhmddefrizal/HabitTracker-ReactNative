import { createContext } from "react";
import { Models } from "react-native-appwrite";

type AuthContextType = {
    user: Models.User<Models.Preferences> | null;
}

const AuthContext = createContext(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    return <></>;
}

export function useAuth() {

}