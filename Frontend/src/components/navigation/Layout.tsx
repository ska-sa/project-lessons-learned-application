// src/components/navigation/Layout.tsx
import { Box, CssBaseline, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: "calc(100% - 240px)",
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
