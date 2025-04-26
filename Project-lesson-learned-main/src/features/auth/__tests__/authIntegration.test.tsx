import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../authSlice";
import LoginPage from "../../../pages/LoginPage";
import DashboardPage from "../../../pages/DashboardPage";
import { authService } from "../authService";

jest.mock("../authService");

const renderWithAuth = () => {
  const store = configureStore({
    reducer: {
      auth: authReducer,
    },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/login"]}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </MemoryRouter>
    </Provider>,
  );
};

describe("Authentication Integration", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it("should allow login and redirect to dashboard", async () => {
    (authService.login as jest.Mock).mockResolvedValue({
      token: "test-token",
      user: {
        id: "1",
        name: "Test User",
        role: "user",
      },
    });

    renderWithAuth();

    userEvent.type(screen.getByLabelText(/SARAO Email/i), "test@example.com");
    userEvent.type(screen.getByLabelText(/Access Code/i), "correctpassword");
    userEvent.click(screen.getByRole("button", { name: /authenticate/i }));

    await waitFor(() => {
      expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
    });
  });

  it("should show error message on failed login", async () => {
    (authService.login as jest.Mock).mockRejectedValue(
      new Error("Invalid credentials"),
    );

    renderWithAuth();

    userEvent.type(screen.getByLabelText(/SARAO Email/i), "test@example.com");
    userEvent.type(screen.getByLabelText(/Access Code/i), "wrongpassword");
    userEvent.click(screen.getByRole("button", { name: /authenticate/i }));

    await waitFor(() => {
      expect(screen.getByText(/authentication failed/i)).toBeInTheDocument();
    });
  });
});
