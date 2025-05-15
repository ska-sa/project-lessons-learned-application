import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AuthProvider, { useAuth } from "../AuthProvider";
import { act } from "react-dom/test-utils";

const TestComponent = () => {
  const { user, login, logout } = useAuth();
  return (
    <div>
      <span>{user ? user.name : "No user"}</span>
      <button onClick={() => login("test@example.com", "password")}>
        Login
      </button>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
};

describe("AuthProvider", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should provide initial null user", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    expect(screen.getByText("No user")).toBeInTheDocument();
  });

  it("should handle login and update user state", async () => {
    jest
      .spyOn(require("../authService"), "authService")
      .mockImplementation(() => ({
        login: jest.fn().mockResolvedValue({
          id: "1",
          name: "Test User",
          role: "user",
        }),
      }));

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    await act(async () => {
      userEvent.click(screen.getByText("Login"));
    });

    await waitFor(() => {
      expect(screen.getByText("Test User")).toBeInTheDocument();
    });
  });

  it("should handle logout and clear user state", async () => {
    jest
      .spyOn(require("../authService"), "authService")
      .mockImplementation(() => ({
        login: jest.fn().mockResolvedValue({
          id: "1",
          name: "Test User",
          role: "user",
        }),
        logout: jest.fn().mockResolvedValue(undefined),
      }));

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    // First login
    await act(async () => {
      userEvent.click(screen.getByText("Login"));
    });

    // Then logout
    await act(async () => {
      userEvent.click(screen.getByText("Logout"));
    });

    await waitFor(() => {
      expect(screen.getByText("No user")).toBeInTheDocument();
    });
  });
});
