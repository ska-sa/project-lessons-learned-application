import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { Provider } from "react-redux";
import { store } from "./store/store";
import AuthProvider from "./features/auth/AuthProvider";
import Notification from "./components/common/Notification";
import { SessionWarningModal } from "./components/SessionWarningModal";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#f5f5f5",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <AuthProvider>
            <Notification />
            <AppRoutes />
            <SessionWarningModal />
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
