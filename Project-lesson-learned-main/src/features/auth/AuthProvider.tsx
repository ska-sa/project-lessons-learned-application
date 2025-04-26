import {
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
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => ({}) as User,
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
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

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
