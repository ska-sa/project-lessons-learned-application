import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import { useAuth } from "../../features/auth/useAuth";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Typography
          variant="h5"
          noWrap
          component="div"
          sx={{
            flexGrow: 1,
            fontWeight: '600',
            letterSpacing: '0.5px',
            color: 'white',
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
            py: 1,
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
           
            typography: { xs: { fontSize: '1.25rem' }, sm: { fontSize: '1.5rem' } },
          }}
        >
          Project Retrospective Tracker
        </Typography>
        <Button
          color="inherit"
          onClick={handleLogout}
          sx={{
            fontWeight: 'medium',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            },
          }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
