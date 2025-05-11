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
<<<<<<< Updated upstream
=======
  register: (credentials: {
    email: string;
    password: string;
    name: string;
  }) => Promise<User>;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
>>>>>>> Stashed changes
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => ({}) as User,
  logout: async () => {},
<<<<<<< Updated upstream
=======
  register: async () => ({}) as User,
  isAuthenticated: false,
  isAdmin: false,
  loading: true,
>>>>>>> Stashed changes
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
        })
      );
    }
    setLoading(false);
  }, [dispatch]);

  const login = async (email: string, password: string) => {
    const user = await authService.login(email, password);
    // Temporary test admin user
    const testUser = {
      ...user,
      isAdmin: email.endsWith("@test.com") || user.role === "admin",
    };
    setUser(testUser);
    dispatch(
      setCredentials({
        user: testUser,
        token: "local-token",
      })
<<<<<<< Updated upstream
=======
    );
    return testUser;
  };

  const register = async (credentials: { email: string; password: string; name: string }) => {
    const user = await authService.register(
      credentials.email,
      credentials.password,
      credentials.name,
    );
    const testUser = {
      ...user,
      isAdmin: credentials.email.endsWith("@test.com") || user.role === "admin",
    };
    setUser(testUser);
    dispatch(
      setCredentials({
        user: testUser,
        token: "local-token",
      }),
>>>>>>> Stashed changes
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
      })
    );
  };

<<<<<<< Updated upstream
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
=======
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
>>>>>>> Stashed changes
      {children}
    </AuthContext.Provider>
  );
}
