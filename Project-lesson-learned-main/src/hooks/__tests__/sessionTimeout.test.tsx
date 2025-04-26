import { renderHook, act } from "@testing-library/react";
import { useSessionTimeout } from "../useSessionTimeout";
import { useAuth } from "../../features/auth/AuthProvider";

jest.mock("../../features/auth/AuthProvider");
jest.useFakeTimers();

describe("useSessionTimeout", () => {
  const mockLogout = jest.fn();

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      logout: mockLogout,
    });
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it("should initialize with correct default values", () => {
    const { result } = renderHook(() => useSessionTimeout());

    expect(result.current.timeLeft).toBeNull();
    expect(result.current.showWarning).toBe(false);
  });

  it("should show warning when time is running out", () => {
    const { result } = renderHook(() => useSessionTimeout());

    // Simulate time passing to trigger warning
    act(() => {
      jest.advanceTimersByTime(28500 * 1000); // Advance to 5 minutes before timeout
    });

    expect(result.current.showWarning).toBe(true);
    expect(result.current.timeLeft).toBeLessThanOrEqual(300);
  });

  it("should logout when time expires", () => {
    const { result } = renderHook(() => useSessionTimeout());

    act(() => {
      jest.advanceTimersByTime(28800 * 1000); // Advance full session timeout (8 hours)
    });

    expect(mockLogout).toHaveBeenCalled();
    expect(result.current.timeLeft).toBeNull();
    expect(result.current.showWarning).toBe(false);
  });

  it("should reset timer on user activity", () => {
    const { result } = renderHook(() => useSessionTimeout());

    // Simulate initial time passing
    act(() => {
      jest.advanceTimersByTime(10000 * 1000); // Advance 10,000 seconds
    });

    const initialTimeLeft = result.current.timeLeft;

    // Simulate user activity
    act(() => {
      const event = new Event("mousemove");
      window.dispatchEvent(event);
    });

    expect(result.current.timeLeft).toBeGreaterThan(initialTimeLeft!);
  });
});
