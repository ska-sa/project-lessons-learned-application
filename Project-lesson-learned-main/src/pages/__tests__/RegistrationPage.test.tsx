import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import RegistrationPage from "../RegistrationPage";
import AuthProvider from "../../features/auth/AuthProvider";
import { authService } from "../../features/auth/authService";

jest.mock("../../features/auth/authService");

describe("RegistrationPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render registration form", () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <RegistrationPage />
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Access Code/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /register/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/login here/i)).toBeInTheDocument();
  });

  it("should display error message on registration failure", async () => {
    (authService.register as jest.Mock).mockRejectedValue(
      new Error("Email already registered")
    );

    render(
      <MemoryRouter>
        <AuthProvider>
          <RegistrationPage />
        </AuthProvider>
      </MemoryRouter>
    );

    userEvent.type(screen.getByLabelText(/Full Name/i), "Test User");
    userEvent.type(screen.getByLabelText(/Email/i), "test@example.com");
    userEvent.type(screen.getByLabelText(/Access Code/i), "ValidPass123!");
    userEvent.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() => {
      expect(screen.getByText(/email already registered/i)).toBeInTheDocument();
    });
  });

  it("should register successfully", async () => {
    (authService.register as jest.Mock).mockResolvedValue({
      id: "4",
      name: "New User",
      role: "frontend",
    });

    render(
      <MemoryRouter>
        <AuthProvider>
          <RegistrationPage />
        </AuthProvider>
      </MemoryRouter>
    );

    userEvent.type(screen.getByLabelText(/Full Name/i), "New User");
    userEvent.type(screen.getByLabelText(/Email/i), "new@example.com");
    userEvent.type(screen.getByLabelText(/Access Code/i), "ValidPass123!");
    userEvent.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() => {
      expect(authService.register).toHaveBeenCalledWith(
        "new@example.com",
        "ValidPass123!",
        "New User"
      );
    });
  });
});
