import {
  Box,
  Typography,
  Paper,
  Grid as MuiGrid,
  Divider,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  IconButton,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Badge,
  Switch,
  Stack,
  LinearProgress,
  useTheme,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
} from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import {
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Refresh as RefreshIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  CheckCircle as ActiveIcon,
  CheckCircle as CheckCircleIcon,
  Block as InactiveIcon,
  Warning as AtRiskIcon,
  Folder as ProjectIcon,
  Group as TeamIcon,
  CalendarToday as DateIcon,
  ArrowUpward as HighPriorityIcon,
  ArrowDownward as LowPriorityIcon,
  TrendingUp as TrendingIcon,
  Email as EmailIcon,
  AdminPanelSettings as AdminIcon,
  Person as UserIcon,
  BarChart as ChartIcon,
  List as ListIcon,
  Lock as SecureIcon,
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { GridProps } from "@mui/material/Grid";

interface CustomGridProps extends GridProps {
  item?: boolean;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

const Grid = ({ item, component = "div", ...props }: CustomGridProps) => (
  <MuiGrid {...props} component={component} item={item} />
);

interface Project {
  id: number;
  name: string;
  status: "active" | "completed" | "on-hold";
  startDate: string;
  endDate: string;
  teamSize: number;
  riskLevel: "low" | "medium" | "high";
  lessonsCount: number;
  isFavorite: boolean;
}

interface Lesson {
  id: number;
  projectId: number;
  projectName: string;
  category: string;
  description: string;
  dateRecorded: string;
  isConfidential: boolean;
  tags: string[];
}

interface DashboardStats {
  totalProjects: number;
  activeProjects: number;
  lessonsRecorded: number;
  trendingCategories: string[];
}

const ProjectPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [filteredLessons, setFilteredLessons] = useState<Lesson[]>([]);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const rowsPerPage = 5;

  // Simulate API fetch for projects
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock data for projects
        const mockProjects: Project[] = [
          {
            id: 1,
            name: "Vehicle Inspection System",
            status: "active",
            startDate: "2023-01-15",
            endDate: "2023-12-31",
            teamSize: 8,
            riskLevel: "medium",
            lessonsCount: 12,
            isFavorite: true,
          },
          {
            id: 2,
            name: "Retrospective Tracker",
            status: "active",
            startDate: "2023-03-10",
            endDate: "2023-11-30",
            teamSize: 5,
            riskLevel: "low",
            lessonsCount: 8,
            isFavorite: false,
          },
          {
            id: 3,
            name: "Admin Portal Redesign",
            status: "completed",
            startDate: "2022-11-01",
            endDate: "2023-05-15",
            teamSize: 6,
            riskLevel: "high",
            lessonsCount: 15,
            isFavorite: true,
          },
          {
            id: 4,
            name: "Notification Service",
            status: "on-hold",
            startDate: "2023-04-20",
            endDate: "2023-10-15",
            teamSize: 3,
            riskLevel: "high",
            lessonsCount: 5,
            isFavorite: false,
          },
          {
            id: 5,
            name: "Data Analytics Dashboard",
            status: "active",
            startDate: "2023-02-01",
            endDate: "2023-09-30",
            teamSize: 7,
            riskLevel: "medium",
            lessonsCount: 10,
            isFavorite: false,
          },
        ];

        // Mock data for lessons learned
        const mockLessons: Lesson[] = [
          {
            id: 1,
            projectId: 1,
            projectName: "Vehicle Inspection System",
            category: "Testing",
            description:
              "Need to implement more rigorous testing for edge cases in vehicle inspection workflow",
            dateRecorded: "2023-05-10",
            isConfidential: false,
            tags: ["testing", "quality"],
          },
          {
            id: 2,
            projectId: 1,
            projectName: "Vehicle Inspection System",
            category: "Documentation",
            description:
              "API documentation was incomplete which delayed frontend integration",
            dateRecorded: "2023-04-22",
            isConfidential: false,
            tags: ["documentation", "api"],
          },
          {
            id: 3,
            projectId: 2,
            projectName: "Retrospective Tracker",
            category: "UI/UX",
            description:
              "Users found the lesson entry form too complex, needs simplification",
            dateRecorded: "2023-06-05",
            isConfidential: false,
            tags: ["ui", "ux"],
          },
          {
            id: 4,
            projectId: 3,
            projectName: "Admin Portal Redesign",
            category: "Security",
            description:
              "Need to implement more granular permission controls for admin functions",
            dateRecorded: "2023-03-18",
            isConfidential: true,
            tags: ["security", "admin"],
          },
          {
            id: 5,
            projectId: 5,
            projectName: "Data Analytics Dashboard",
            category: "Performance",
            description:
              "Dashboard loading times were unacceptable with large datasets, need optimization",
            dateRecorded: "2023-05-30",
            isConfidential: false,
            tags: ["performance", "optimization"],
          },
        ];

        // Mock dashboard stats
        const mockStats: DashboardStats = {
          totalProjects: 5,
          activeProjects: 3,
          lessonsRecorded: 50,
          trendingCategories: ["Testing", "UI/UX", "Security", "Performance"],
        };

        setProjects(mockProjects);
        setLessons(mockLessons);
        setFilteredProjects(mockProjects);
        setFilteredLessons(mockLessons);
        setDashboardStats(mockStats);
        setLoading(false);
      } catch (err) {
        setError("Failed to load dashboard data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = projects;

    if (searchQuery) {
      filtered = filtered.filter((project) =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((project) => project.status === statusFilter);
    }

    setFilteredProjects(filtered);
  }, [searchQuery, statusFilter, projects]);

  useEffect(() => {
    let filtered = lessons;

    if (categoryFilter !== "all") {
      filtered = filtered.filter(
        (lesson) =>
          lesson.category.toLowerCase() === categoryFilter.toLowerCase(),
      );
    }

    setFilteredLessons(filtered);
  }, [categoryFilter, lessons]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleStatusFilterChange = (event: { target: { value: string } }) => {
    setStatusFilter(event.target.value);
  };

  const handleCategoryFilterChange = (event: { target: { value: string } }) => {
    setCategoryFilter(event.target.value);
  };

  const toggleFavorite = (projectId: number) => {
    setProjects(
      projects.map((project) =>
        project.id === projectId
          ? { ...project, isFavorite: !project.isFavorite }
          : project,
      ),
    );
  };

  const getStatusChip = (status: string) => {
    const statusMap = {
      active: { color: "success", icon: <ActiveIcon /> },
      completed: { color: "primary", icon: <CheckCircleIcon /> },
      "on-hold": { color: "warning", icon: <AtRiskIcon /> },
    };

    const statusConfig = statusMap[status as keyof typeof statusMap] || {
      color: "default",
      icon: null,
    };

    return (
      <Chip
        icon={statusConfig.icon}
        label={status}
        color={statusConfig.color as any}
        variant="outlined"
        size="small"
      />
    );
  };

  const getRiskChip = (riskLevel: string) => {
    const riskMap = {
      low: { color: "success", icon: <LowPriorityIcon /> },
      medium: { color: "warning", icon: <TrendingIcon /> },
      high: { color: "error", icon: <HighPriorityIcon /> },
    };

    const riskConfig = riskMap[riskLevel as keyof typeof riskMap] || {
      color: "default",
      icon: null,
    };

    return (
      <Chip
        icon={riskConfig.icon}
        label={riskLevel}
        color={riskConfig.color as any}
        variant="outlined"
        size="small"
      />
    );
  };

  const projectColumns: GridColDef[] = [
    {
      field: "isFavorite",
      headerName: "",
      width: 60,
      sortable: false,
      renderCell: (params) => (
        <IconButton onClick={() => toggleFavorite(params.row.id)} size="small">
          {params.row.isFavorite ? (
            <StarIcon color="warning" />
          ) : (
            <StarBorderIcon />
          )}
        </IconButton>
      ),
    },
    {
      field: "name",
      headerName: "Project Name",
      width: 200,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <ProjectIcon color="primary" />
          {params.row.name}
        </Box>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => getStatusChip(params.value),
    },
    {
      field: "riskLevel",
      headerName: "Risk Level",
      width: 120,
      renderCell: (params) => getRiskChip(params.value),
    },
    {
      field: "teamSize",
      headerName: "Team Size",
      width: 100,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <TeamIcon color="action" />
          {params.value}
        </Box>
      ),
    },
    {
      field: "lessonsCount",
      headerName: "Lessons",
      width: 100,
      renderCell: (params) => (
        <Button
          variant="outlined"
          size="small"
          onClick={() => navigate(`/projects/${params.row.id}/lessons`)}
          startIcon={<ListIcon />}
        >
          {params.value}
        </Button>
      ),
    },
    {
      field: "actions",
      type: "actions",
      width: 120,
      getActions: (params) => [
        <IconButton
          color="primary"
          onClick={() => navigate(`/projects/${params.id}`)}
        >
          <EditIcon />
        </IconButton>,
        <IconButton
          color="error"
          onClick={() =>
            setProjects(projects.filter((project) => project.id !== params.id))
          }
        >
          <DeleteIcon />
        </IconButton>,
        <IconButton
          color="info"
          onClick={() => navigate(`/projects/${params.id}/retrospective`)}
        >
          <ViewIcon />
        </IconButton>,
      ],
    },
  ];

  const lessonColumns: GridColDef[] = [
    {
      field: "projectName",
      headerName: "Project",
      width: 180,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <ProjectIcon color="primary" fontSize="small" />
          {params.value}
        </Box>
      ),
    },
    {
      field: "category",
      headerName: "Category",
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color="primary"
          size="small"
          variant="outlined"
        />
      ),
    },
    {
      field: "description",
      headerName: "Lesson Learned",
      width: 300,
      renderCell: (params) => (
        <Typography variant="body2">
          {params.value.length > 100
            ? `${params.value.substring(0, 100)}...`
            : params.value}
        </Typography>
      ),
    },
    {
      field: "tags",
      headerName: "Tags",
      width: 200,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
          {params.value.map((tag: string, index: number) => (
            <Chip key={index} label={tag} size="small" variant="outlined" />
          ))}
        </Box>
      ),
    },
    {
      field: "dateRecorded",
      headerName: "Date Recorded",
      width: 120,
    },
    {
      field: "isConfidential",
      headerName: "Confidential",
      width: 100,
      renderCell: (params) =>
        params.value ? <SecureIcon color="error" /> : <span>-</span>,
    },
  ];

  if (error) {
    return (
      <Box
        sx={{
          p: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Paper sx={{ p: 3, textAlign: "center" }}>
          <Typography color="error" variant="h5" gutterBottom>
            Error Loading Dashboard
          </Typography>
          <Typography variant="body1" gutterBottom>
            {error}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => window.location.reload()}
            sx={{ mt: 2 }}
          >
            Retry
          </Button>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Project Retrospective Dashboard
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate("/projects/new")}
          >
            New Project
          </Button>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => navigate("/lessons/new")}
          >
            Add Lesson
          </Button>
        </Box>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Dashboard Stats Cards */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardHeader
                  title="Total Projects"
                  avatar={<ProjectIcon color="primary" />}
                />
                <CardContent>
                  <Typography variant="h4">
                    {dashboardStats?.totalProjects || 0}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardHeader
                  title="Active Projects"
                  avatar={<ActiveIcon color="success" />}
                />
                <CardContent>
                  <Typography variant="h4">
                    {dashboardStats?.activeProjects || 0}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardHeader
                  title="Lessons Recorded"
                  avatar={<ListIcon color="info" />}
                />
                <CardContent>
                  <Typography variant="h4">
                    {dashboardStats?.lessonsRecorded || 0}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardHeader
                  title="Trending Categories"
                  avatar={<TrendingIcon color="warning" />}
                />
                <CardContent>
                  <Stack spacing={1}>
                    {dashboardStats?.trendingCategories.map(
                      (category, index) => (
                        <Chip key={index} label={category} variant="outlined" />
                      ),
                    )}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Projects Section */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h6" component="h2">
                Projects
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  size="small"
                  placeholder="Search projects..."
                  InputProps={{
                    startAdornment: <SearchIcon color="action" />,
                  }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={statusFilter}
                    label="Status"
                    onChange={handleStatusFilterChange}
                  >
                    <MenuItem value="all">All Statuses</MenuItem>
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                    <MenuItem value="on-hold">On Hold</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>

            <DataGrid
              rows={filteredProjects}
              columns={projectColumns}
              pageSizeOptions={[5, 10, 25]}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: rowsPerPage },
                },
              }}
              slots={{ toolbar: GridToolbar }}
              sx={{ height: 400 }}
            />
          </Paper>

          {/* Lessons Learned Section */}
          <Paper sx={{ p: 3 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h6" component="h2">
                Recent Lessons Learned
              </Typography>
              <FormControl size="small" sx={{ minWidth: 180 }}>
                <InputLabel>Filter by Category</InputLabel>
                <Select
                  value={categoryFilter}
                  label="Filter by Category"
                  onChange={handleCategoryFilterChange}
                >
                  <MenuItem value="all">All Categories</MenuItem>
                  {Array.from(
                    new Set(lessons.map((lesson) => lesson.category)),
                  ).map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <DataGrid
              rows={filteredLessons}
              columns={lessonColumns}
              pageSizeOptions={[5, 10, 25]}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: rowsPerPage },
                },
              }}
              slots={{ toolbar: GridToolbar }}
              sx={{ height: 400 }}
            />
          </Paper>
        </>
      )}
    </Box>
  );
};

export default ProjectPage;
