import { authService } from "../authService";
import { storeCredentials, clearCredentials } from "../credentialStorage";
import axios from "axios";

jest.mock("axios");
jest.mock("../credentialStorage");

const mockUser = {
  id: "1",
  name: "Test User",
  role: "user",
};

describe("authService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("login", () => {
    it("should store credentials on successful login", async () => {
      (axios.post as jest.Mock).mockResolvedValue({
        data: {
          token: "test-token",
          user: mockUser,
        },
      });

      const user = await authService.login("test@example.com", "password");

      expect(user).toEqual(mockUser);
      expect(storeCredentials).toHaveBeenCalledWith({
        token: "test-token",
        user: mockUser,
      });
    });

    it("should clear credentials and throw error on failed login", async () => {
      (axios.post as jest.Mock).mockRejectedValue({
        response: {
          data: {
            message: "Invalid credentials",
          },
        },
      });

      await expect(
        authService.login("test@example.com", "wrong"),
      ).rejects.toThrow("Invalid credentials");
      expect(clearCredentials).toHaveBeenCalled();
    });
  });

  describe("logout", () => {
    it("should clear credentials on logout", async () => {
      (axios.post as jest.Mock).mockResolvedValue({});

      await authService.logout();
      expect(clearCredentials).toHaveBeenCalled();
    });

    it("should clear credentials even if logout request fails", async () => {
      (axios.post as jest.Mock).mockRejectedValue(new Error("Network error"));

      await authService.logout();
      expect(clearCredentials).toHaveBeenCalled();
    });
  });
});
