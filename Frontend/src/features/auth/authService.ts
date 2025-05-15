import axios from "axios";
import { storeCredentials, clearCredentials } from "./credentialStorage";
import { User } from "./credentialStorage";
import { validatePassword } from "../../utils/authPolicy";

// Set your API base URL
const API_BASE_URL = "http://localhost:8000"; // Change this if needed

export const authService = {
  async login(email: string, password: string): Promise<User> {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email,
        password,
      });

      const { user, token } = response.data;

      storeCredentials({ user, token });
      return user;
    } catch (error: any) {
      clearCredentials();
      throw new Error(error.response?.data?.detail || "Login failed");
    }
  },

  async register(email: string, password: string, name: string): Promise<User> {
    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
      throw new Error(passwordErrors.join(", "));
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/register`, {
        email,
        password,
        name,
      });

      const { user, token } = response.data;

      storeCredentials({ user, token });
      return user;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || "Registration failed");
    }
  },

  async logout(): Promise<void> {
    clearCredentials();
    // Optionally, you can call the backend logout endpoint if needed
  },
};
