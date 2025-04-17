import { render } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import ProtectedRoute from "../ProtectedRoute";
import authReducer from "../authSlice";

const TestComponent = () => <div>Protected Content</div>;

const renderWithAuth = (initialAuthState: any, adminOnly = false) => {
  const store = configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: {
      auth: initialAuthState,
    },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route
            path="/protected"
            element={
              <ProtectedRoute adminOnly={adminOnly}>
                <TestComponent />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<div>Login Page</div>} />
          <Route path="/dashboard" element={<div>Dashboard</div>} />
        </Routes>
      </MemoryRouter>
    </Provider>,
  );
};

describe("ProtectedRoute", () => {
  it("should redirect to login when user is not authenticated", () => {
    const { container } = renderWithAuth({ user: null });
    expect(container).toHaveTextContent("Login Page");
  });

  it("should render protected content when user is authenticated", () => {
    const { container } = renderWithAuth({
      user: { id: "1", name: "Test User", role: "user" },
    });
    expect(container).toHaveTextContent("Protected Content");
  });

  it("should redirect to dashboard when adminOnly is true and user is not admin", () => {
    const { container } = renderWithAuth(
      {
        user: { id: "1", name: "Test User", role: "user" },
      },
      true,
    );
    expect(container).toHaveTextContent("Dashboard");
  });

  it("should render protected content when adminOnly is true and user is admin", () => {
    const { container } = renderWithAuth(
      {
        user: { id: "1", name: "Test Admin", role: "admin" },
      },
      true,
    );
    expect(container).toHaveTextContent("Protected Content");
  });
});
