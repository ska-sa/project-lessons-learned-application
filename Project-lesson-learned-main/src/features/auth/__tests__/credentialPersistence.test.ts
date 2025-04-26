import {
  storeCredentials,
  getCredentials,
  clearCredentials,
} from "../credentialStorage";

describe("Credential Persistence", () => {
  const testCredentials = {
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
  });

  it("should store and retrieve credentials", () => {
    storeCredentials(testCredentials);
    const retrieved = getCredentials();
    expect(retrieved).toEqual(testCredentials);
  });

  it("should clear stored credentials", () => {
    storeCredentials(testCredentials);
    clearCredentials();
    const retrieved = getCredentials();
    expect(retrieved).toBeNull();
  });

  it("should handle corrupted storage data", () => {
    localStorage.setItem("sarao_rt_auth", "invalid-json");
    const retrieved = getCredentials();
    expect(retrieved).toBeNull();
  });

  it("should handle missing storage data", () => {
    const retrieved = getCredentials();
    expect(retrieved).toBeNull();
  });

  it("should handle storage errors gracefully", () => {
    // Mock localStorage.setItem to throw error
    jest.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("Storage error");
    });

    expect(() => storeCredentials(testCredentials)).not.toThrow();
  });
});
