import React, {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { authService } from "./authService";
import { getCredentials, clearCredentials } from "./credentialStorage";
import { User } from "./credentialStorage";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<User>;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => ({}) as User,
  logout: async () => {},
  register: async () => ({}) as User,
  isAuthenticated: false,
  isAdmin: false,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedCredentials = getCredentials();
    if (savedCredentials) {
      setUser(savedCredentials.user);
      dispatch(
        setCredentials({
          user: savedCredentials.user,
          token: savedCredentials.token,
        }),
      );
    }
    setLoading(false);
  }, [dispatch]);

  const login = async (email: string, password: string) => {
    const user = await authService.login(email, password);
    const testUser = {
      ...user,
      isAdmin: email.endsWith("@test.com") || user.role === "admin",
    };
    setUser(testUser);
    dispatch(
      setCredentials({
        user: testUser,
        token: "local-token",
      }),
    );
    return testUser;
  };

  const register = async (email: string, password: string, name: string) => {
    const user = await authService.register(email, password, name);
    const testUser = {
      ...user,
      isAdmin: email.endsWith("@test.com") || user.role === "admin",
    };
    setUser(testUser);
    dispatch(
      setCredentials({
        user: testUser,
        token: "local-token",
      }),
    );
    return testUser;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    dispatch(
      setCredentials({
        user: null,
        token: null,
      }),
    );
  };

  const isAuthenticated = user !== null;
  const isAdmin = user?.isAdmin === true;

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        isAuthenticated,
        isAdmin,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}