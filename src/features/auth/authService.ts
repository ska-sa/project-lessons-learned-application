import { storeCredentials, clearCredentials } from "./credentialStorage";
import { User } from "./credentialStorage";

// Frontend team members
const LOCAL_USERS = [
  {
    email: "tebogo@test.com",
    password: "tebogo123",
    user: {
      id: "1",
      name: "Tebogo",
      role: "frontend",
      isAdmin: true,
    },
  },
  {
    email: "anele@frontend.com",
    password: "anele123",
    user: {
      id: "2",
      name: "Anele",
      role: "frontend",
    },
  },
  {
    email: "hluli@frontend.com",
    password: "hluli123",
    user: {
      id: "3",
      name: "Hluli",
      role: "frontend",
    },
  },
];

export const authService = {
  async login(email: string, password: string): Promise<User> {
    const user = LOCAL_USERS.find(
      (u) => u.email === email && u.password === password,
    );

    if (user) {
      storeCredentials({
        token: "local-token",
        user: user.user,
      });
      return user.user;
    }

    clearCredentials();
    throw new Error("Invalid email or password");
  },

  async logout(): Promise<void> {
    clearCredentials();
  },
};
