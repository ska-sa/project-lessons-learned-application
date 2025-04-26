import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { User } from "./credentialStorage";

interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
}

interface AuthContextValue {
  user: User | null;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<User>;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
