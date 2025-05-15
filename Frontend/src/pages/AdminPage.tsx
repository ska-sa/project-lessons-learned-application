import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Avatar,
  Chip,
  Tooltip,
  useTheme,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  Badge,
  Switch,
  Pagination,
  Stack,
  LinearProgress,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  AdminPanelSettings as AdminIcon,
  Person as UserIcon,
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Refresh as RefreshIcon,
  CheckCircle as ActiveIcon,
  Block as InactiveIcon,
  Visibility as ViewIcon,
  Email as EmailIcon,
} from "@mui/icons-material";
import { useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  lastLogin?: string;
  joinDate: string;
}

const AdminPage = () => {
  const theme = useTheme();
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const rowsPerPage = 5;

  // Simulate API fetch
  useEffect(() => {
    const fetchUsers = () => {
      setLoading(true);
      // Mock API call
      setTimeout(() => {
        const mockUsers: User[] = [
          {
            id: 1,
            name: "Admin User",
            email: "admin@example.com",
            role: "admin",
            status: "active",
            lastLogin: "2023-06-15 09:30",
            joinDate: "2022-01-10",
          },
          {
            id: 2,
            name: "Regular User",
            email: "user@example.com",
            role: "user",
            status: "active",
            lastLogin: "2023-06-14 14:45",
            joinDate: "2023-03-15",
          },
          {
            id: 3,
            name: "Manager",
            email: "manager@example.com",
            role: "manager",
            status: "active",
            lastLogin: "2023-06-15 11:20",
            joinDate: "2022-11-05",
          },
          {
            id: 4,
            name: "Editor",
            email: "editor@example.com",
            role: "editor",
            status: "inactive",
            lastLogin: "2023-05-30 16:10",
            joinDate: "2023-01-20",
          },
          {
            id: 5,
            name: "Content Moderator",
            email: "moderator@example.com",
            role: "moderator",
            status: "active",
            lastLogin: "2023-06-14 10:15",
            joinDate: "2023-02-28",
          },
          {
            id: 6,
            name: "Analyst",
            email: "analyst@example.com",
            role: "analyst",
            status: "inactive",
            joinDate: "2023-04-10",
          },
          {
            id: 7,
            name: "Support Staff",
            email: "support@example.com",
            role: "support",
            status: "active",
            lastLogin: "2023-06-15 08:45",
            joinDate: "2023-05-01",
          },
        ];
        setUsers(mockUsers);
        setFilteredUsers(mockUsers);
        setLoading(false);
      }, 1000);
    };

    fetchUsers();
  }, []);

  // Apply filters
  useEffect(() => {
    let result = users;

    if (searchTerm) {
      result = result.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (roleFilter !== "all") {
      result = result.filter((user) => user.role === roleFilter);
    }

    if (statusFilter !== "all") {
      result = result.filter((user) => user.status === statusFilter);
    }

    setFilteredUsers(result);
    setPage(1); // Reset to first page when filters change
  }, [searchTerm, roleFilter, statusFilter, users]);

  const handleOpenDialog = (user: User | null) => {
    setCurrentUser(user);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentUser(null);
  };

  const handleSaveUser = () => {
    // In a real app, this would call an API
    setSnackbar({
      open: true,
      message: currentUser?.id
        ? "User updated successfully"
        : "User added successfully",
      severity: "success",
    });
    handleCloseDialog();
  };

  const handleDeleteUser = (id: number) => {
    // In a real app, this would call an API
    setUsers(users.filter((user) => user.id !== id));
    setSnackbar({
      open: true,
      message: "User deleted successfully",
      severity: "success",
    });
  };

  const handleStatusChange = (id: number) => {
    setUsers(
      users.map((user) =>
        user.id === id
          ? {
              ...user,
              status: user.status === "active" ? "inactive" : "active",
            }
          : user,
      ),
    );
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  const getRoleChip = (role: string) => {
    const colorMap: Record<string, any> = {
      admin: { color: "error", icon: <AdminIcon fontSize="small" /> },
      user: { color: "primary", icon: <UserIcon fontSize="small" /> },
      manager: { color: "warning", icon: <AdminIcon fontSize="small" /> },
      editor: { color: "success", icon: <EditIcon fontSize="small" /> },
      moderator: { color: "info", icon: <ViewIcon fontSize="small" /> },
      analyst: { color: "secondary", icon: <ViewIcon fontSize="small" /> },
      support: { color: "info", icon: <UserIcon fontSize="small" /> },
    };

    return (
      <Chip
        icon={colorMap[role]?.icon}
        label={role}
        color={colorMap[role]?.color || "default"}
        variant="outlined"
        size="small"
        sx={{ textTransform: "capitalize" }}
      />
    );
  };

  const getStatusChip = (status: string) => {
    return (
      <Chip
        icon={
          status === "active" ? (
            <ActiveIcon fontSize="small" />
          ) : (
            <InactiveIcon fontSize="small" />
          )
        }
        label={status}
        color={status === "active" ? "success" : "error"}
        size="small"
        sx={{ textTransform: "capitalize" }}
      />
    );
  };

  const paginatedUsers = filteredUsers.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage,
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{
          fontWeight: 600,
          mb: 4,
          color: theme.palette.primary.main,
        }}
      >
        Admin Dashboard
      </Typography>

      <Paper
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 2,
          boxShadow: theme.shadows[3],
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 500 }}>
            User Management
          </Typography>

          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <TextField
              size="small"
              placeholder="Search users..."
              InputProps={{
                startAdornment: <SearchIcon color="action" />,
              }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ minWidth: 200 }}
            />

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Role</InputLabel>
              <Select
                value={roleFilter}
                label="Role"
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <MenuItem value="all">All Roles</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="manager">Manager</MenuItem>
                <MenuItem value="editor">Editor</MenuItem>
                <MenuItem value="moderator">Moderator</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                label="Status"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="all">All Statuses</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog(null)}
            >
              Add User
            </Button>
          </Box>
        </Box>

        {loading ? (
          <LinearProgress />
        ) : (
          <>
            <TableContainer>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow
                    sx={{
                      backgroundColor: theme.palette.grey[100],
                    }}
                  >
                    <TableCell sx={{ fontWeight: 600 }}>User</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Role</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Last Login</TableCell>
                    <TableCell sx={{ fontWeight: 600 }} align="right">
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedUsers.length > 0 ? (
                    paginatedUsers.map((user) => (
                      <TableRow
                        key={user.id}
                        hover
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                          "&:hover": {
                            backgroundColor: theme.palette.action.hover,
                          },
                        }}
                      >
                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                            }}
                          >
                            <Avatar
                              sx={{
                                bgcolor: theme.palette.primary.main,
                                width: 32,
                                height: 32,
                              }}
                            >
                              {user.name.charAt(0)}
                            </Avatar>
                            {user.name}
                          </Box>
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{getRoleChip(user.role)}</TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Switch
                              checked={user.status === "active"}
                              onChange={() => handleStatusChange(user.id)}
                              color="success"
                              size="small"
                            />
                            {getStatusChip(user.status)}
                          </Box>
                        </TableCell>
                        <TableCell>
                          {user.lastLogin || "Never logged in"}
                        </TableCell>
                        <TableCell align="right">
                          <Tooltip title="Edit">
                            <IconButton
                              color="primary"
                              onClick={() => handleOpenDialog(user)}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton
                              color="error"
                              sx={{ ml: 1 }}
                              onClick={() => handleDeleteUser(user.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Send Email">
                            <IconButton color="info" sx={{ ml: 1 }}>
                              <EmailIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                        <Typography color="text.secondary">
                          No users found matching your criteria
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {filteredUsers.length > 0 && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                <Pagination
                  count={Math.ceil(filteredUsers.length / rowsPerPage)}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                  showFirstButton
                  showLastButton
                />
              </Box>
            )}
          </>
        )}
      </Paper>

      {/* Add/Edit User Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{currentUser ? "Edit User" : "Add New User"}</DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 1 }}>
            <TextField
              label="Full Name"
              fullWidth
              value={currentUser?.name || ""}
              onChange={(e) =>
                currentUser &&
                setCurrentUser({ ...currentUser, name: e.target.value })
              }
              margin="normal"
            />
            <TextField
              label="Email"
              fullWidth
              type="email"
              value={currentUser?.email || ""}
              onChange={(e) =>
                currentUser &&
                setCurrentUser({ ...currentUser, email: e.target.value })
              }
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Role</InputLabel>
              <Select
                value={currentUser?.role || "user"}
                label="Role"
                onChange={(e) =>
                  currentUser &&
                  setCurrentUser({ ...currentUser, role: e.target.value })
                }
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="manager">Manager</MenuItem>
                <MenuItem value="editor">Editor</MenuItem>
                <MenuItem value="moderator">Moderator</MenuItem>
              </Select>
            </FormControl>
            {currentUser?.id && (
              <FormControl fullWidth margin="normal">
                <InputLabel>Status</InputLabel>
                <Select
                  value={currentUser?.status || "active"}
                  label="Status"
                  onChange={(e) =>
                    currentUser &&
                    setCurrentUser({
                      ...currentUser,
                      status: e.target.value as "active" | "inactive",
                    })
                  }
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveUser} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity as any}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminPage;
