import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useSessionTimeout } from "../hooks/useSessionTimeout";
import { useAuth } from "../features/auth/AuthProvider";

export function SessionWarningModal() {
  const { timeLeft, showWarning } = useSessionTimeout();
  const { logout } = useAuth();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <Dialog open={showWarning} maxWidth="xs" fullWidth>
      <DialogTitle>Session About to Expire</DialogTitle>
      <DialogContent>
        <Typography>
          Your session will expire in {timeLeft && formatTime(timeLeft)}.
          Continue working to stay logged in.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={logout} color="primary">
          Logout Now
        </Button>
      </DialogActions>
    </Dialog>
  );
}
