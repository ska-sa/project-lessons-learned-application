import { render, screen } from "@testing-library/react";
import { SessionWarningModal } from "../SessionWarningModal";
import { useSessionTimeout } from "../../hooks/useSessionTimeout";

jest.mock("../../hooks/useSessionTimeout");

const mockUseSessionTimeout = useSessionTimeout as jest.MockedFunction<
  typeof useSessionTimeout
>;

describe("SessionWarningModal", () => {
  beforeEach(() => {
    mockUseSessionTimeout.mockReturnValue({
      timeLeft: 120, // 2 minutes
      showWarning: true,
    });
  });

  it("should render when warning is active", () => {
    render(<SessionWarningModal />);
    expect(screen.getByText("Session About to Expire")).toBeInTheDocument();
    expect(screen.getByText(/Your session will expire in/)).toBeInTheDocument();
    expect(screen.getByText("Logout Now")).toBeInTheDocument();
  });

  it("should not render when warning is inactive", () => {
    mockUseSessionTimeout.mockReturnValue({
      timeLeft: null,
      showWarning: false,
    });

    render(<SessionWarningModal />);
    expect(
      screen.queryByText("Session About to Expire"),
    ).not.toBeInTheDocument();
  });

  it("should display correct time remaining", () => {
    mockUseSessionTimeout.mockReturnValue({
      timeLeft: 45, // 45 seconds
      showWarning: true,
    });

    render(<SessionWarningModal />);
    expect(screen.getByText(/0:45/)).toBeInTheDocument();
  });
});
