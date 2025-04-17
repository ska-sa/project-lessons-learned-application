// src/components/navigation/Sidebar.tsx
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Toolbar } from "@mui/material";
import {
  Dashboard as DashboardIcon,
  School as LessonsIcon,
  Work as ProjectsIcon,
  Assessment as ReportsIcon,
  Settings as SettingsIcon,
  AdminPanelSettings as AdminIcon,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  { text: "Lessons", icon: <LessonsIcon />, path: "/lessons" },
  { text: "Projects", icon: <ProjectsIcon />, path: "/projects" },
  { text: "Reports", icon: <ReportsIcon />, path: "/reports" },
  { text: "Admin", icon: <AdminIcon />, path: "/admin" },
  { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "primary.light",
                  color: "primary.main",
                },
                "&.Mui-selected:hover": {
                  backgroundColor: "primary.light",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color:
                    location.pathname === item.path
                      ? "primary.main"
                      : "inherit",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
