import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";

export default function Notification() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={() => setOpen(false)}
    >
      <Alert onClose={() => setOpen(false)} severity="success">
        {message}
      </Alert>
    </Snackbar>
  );
}
