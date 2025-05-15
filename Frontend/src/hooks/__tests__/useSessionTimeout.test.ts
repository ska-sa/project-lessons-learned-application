import { renderHook, act } from "@testing-library/react";
import { useSessionTimeout } from "../useSessionTimeout";

jest.useFakeTimers();

describe("useSessionTimeout", () => {
  const mockLogout = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.REACT_APP_SESSION_TIMEOUT = "300"; // 5 minutes
  });

  it("should initialize with no warning", () => {
    const { result } = renderHook(() => useSessionTimeout());

    expect(result.current.showWarning).toBe(false);
    expect(result.current.timeLeft).toBeNull();
  });

  it("should show warning when time is almost up", () => {
    const { result } = renderHook(() => useSessionTimeout());

    act(() => {
      jest.advanceTimersByTime(240 * 1000); // 4 minutes
    });

    expect(result.current.showWarning).toBe(true);
    expect(result.current.timeLeft).toBeLessThanOrEqual(60);
  });

  it("should call logout when session expires", () => {
    const { result } = renderHook(() => useSessionTimeout());

    act(() => {
      jest.advanceTimersByTime(300 * 1000); // 5 minutes
    });

    expect(mockLogout).toHaveBeenCalled();
  });

  it("should reset timer on user activity", () => {
    const { result } = renderHook(() => useSessionTimeout());

    act(() => {
      jest.advanceTimersByTime(240 * 1000); // 4 minutes
    });

    expect(result.current.showWarning).toBe(true);

    // Simulate user activity
    act(() => {
      window.dispatchEvent(new MouseEvent("mousemove"));
    });

    expect(result.current.showWarning).toBe(false);
  });
});
