import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import LoginPage from "../LoginPage";
import AuthProvider from "../../features/auth/AuthProvider";
import { act } from "react-dom/test-utils";
import { authService } from "../../features/auth/authService";

jest.mock("../../features/auth/authService");

describe("LoginPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render login form", () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <LoginPage />
        </AuthProvider>
      </MemoryRouter>,
    );

    expect(screen.getByLabelText(/SARAO Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Access Code/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /authenticate/i }),
    ).toBeInTheDocument();
  });

  it("should display error message on invalid login", async () => {
    (authService.login as jest.Mock).mockRejectedValue(
      new Error("Invalid credentials"),
    );

    render(
      <MemoryRouter>
        <AuthProvider>
          <LoginPage />
        </AuthProvider>
      </MemoryRouter>,
    );

    userEvent.type(screen.getByLabelText(/SARAO Email/i), "test@example.com");
    userEvent.type(screen.getByLabelText(/Access Code/i), "wrongpassword");
    userEvent.click(screen.getByRole("button", { name: /authenticate/i }));

    await waitFor(() => {
      expect(screen.getByText(/authentication failed/i)).toBeInTheDocument();
    });
  });

  it("should log in successfully", async () => {
    (authService.login as jest.Mock).mockResolvedValue({
      id: "1",
      name: "Test User",
      role: "user",
    });

    render(
      <MemoryRouter>
        <AuthProvider>
          <LoginPage />
        </AuthProvider>
      </MemoryRouter>,
    );

    userEvent.type(screen.getByLabelText(/SARAO Email/i), "test@example.com");
    userEvent.type(screen.getByLabelText(/Access Code/i), "correctpassword");
    userEvent.click(screen.getByRole("button", { name: /authenticate/i }));

    await waitFor(() => {
      expect(screen.getByText("Test User")).toBeInTheDocument();
    });
  });
});
