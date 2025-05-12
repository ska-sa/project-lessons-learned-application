import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  IconButton,
  Box,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  School as LessonsIcon,
  Work as ProjectsIcon,
  Assessment as ReportsIcon,
  Settings as SettingsIcon,
  AdminPanelSettings as AdminIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useAuth } from "../../features/auth/AuthProvider";
import { useTheme } from "@mui/material/styles";

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');
  const theme = useTheme();

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Lessons", icon: <LessonsIcon />, path: "/lessons" },
    { text: "Projects", icon: <ProjectsIcon />, path: "/projects" },
    { text: "Reports", icon: <ReportsIcon />, path: "/reports" },
    ...(user && user.isAdmin === true
      ? [{ text: "Admin", icon: <AdminIcon />, path: "/admin" }]
      : []),
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <div>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {isMobile && (
          <IconButton
            color="inherit"
            onClick={handleDrawerToggle}
            sx={{ ml: 'auto', color: 'grey.600' }}
          >
            <ChevronLeftIcon />
          </IconButton>
        )}
      </Toolbar>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "#003366",
                  color: "#ffffff",
                  "& .MuiListItemText-primary": {
                    fontWeight: '600',
                    color: '#ffffff',
                  },
                },
                "&.Mui-selected:hover": {
                  backgroundColor: "#003366",
                },
                "&:hover": {
                  backgroundColor: "action.hover",
                },
              }}
              onClick={isMobile ? handleDrawerToggle : undefined}
            >
              <ListItemIcon
                sx={{
                  color:
                    location.pathname === item.path
                      ? "primary.dark"
                      : "action.active",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: location.pathname === item.path ? '600' : '400',
                  color: location.pathname === item.path ? 'primary.dark' : 'text.primary',
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ 
            position: 'fixed', 
            top: 10, 
            left: 10, 
            zIndex: 1200,
            color: 'grey.600'
          }}
        >
          <MenuIcon />
        </IconButton>
      )}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            backgroundColor: theme.palette.background.paper,
            transition: 'width 0.3s ease-in-out',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
