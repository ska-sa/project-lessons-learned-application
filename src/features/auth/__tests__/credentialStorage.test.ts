import {
  storeCredentials,
  getCredentials,
  clearCredentials,
} from "../credentialStorage";

describe("credentialStorage", () => {
  const mockCredentials = {
    token: "test-token",
    user: {
      id: "1",
      name: "Test User",
      role: "user",
    },
    timestamp: Date.now(),
  };

  beforeEach(() => {
    localStorage.clear();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("storeCredentials", () => {
    it("should store credentials in localStorage", () => {
      storeCredentials(mockCredentials);
      const storedData = JSON.parse(localStorage.getItem("sarao_rt_auth")!);
      expect(storedData).toEqual(mockCredentials);
    });

    it("should handle storage errors", () => {
      jest.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
        throw new Error("Storage error");
      });

      storeCredentials(mockCredentials);
      expect(console.error).toHaveBeenCalledWith(
        "Failed to store credentials",
        expect.any(Error),
      );
    });
  });

  describe("getCredentials", () => {
    it("should return stored credentials", () => {
      localStorage.setItem("sarao_rt_auth", JSON.stringify(mockCredentials));
      const credentials = getCredentials();
      expect(credentials).toEqual(mockCredentials);
    });

    it("should return null if no credentials exist", () => {
      const credentials = getCredentials();
      expect(credentials).toBeNull();
    });

    it("should handle parsing errors", () => {
      localStorage.setItem("sarao_rt_auth", "invalid-json");
      const credentials = getCredentials();
      expect(credentials).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        "Failed to retrieve credentials",
        expect.any(Error),
      );
    });
  });

  describe("clearCredentials", () => {
    it("should remove credentials from localStorage", () => {
      localStorage.setItem("sarao_rt_auth", JSON.stringify(mockCredentials));
      clearCredentials();
      expect(localStorage.getItem("sarao_rt_auth")).toBeNull();
    });
  });
});
