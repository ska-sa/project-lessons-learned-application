import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid as MuiGrid,
  Button,
  IconButton,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  CircularProgress,
  Card,
  CardHeader,
  CardContent,
  useTheme,
} from '@mui/material';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  CheckCircle as ActiveIcon,
  CheckCircle as CheckCircleIcon,
  Warning as AtRiskIcon,
  Folder as ProjectIcon,
  Group as TeamIcon,
  List as ListIcon,
  Lock as SecureIcon,
  TrendingUp as TrendingIcon,
  ArrowUpward as HighPriorityIcon,
  ArrowDownward as LowPriorityIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import type { GridProps } from '@mui/material/Grid';

interface CustomGridProps extends GridProps {
  item?: boolean;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

const Grid = ({ item, component = 'div', ...props }: CustomGridProps) => (
  <MuiGrid {...props} component={component} item={item} />
);

interface Project {
  id: number;
  name: string;
  status: 'active' | 'completed' | 'on-hold';
  startDate: string;
  endDate: string;
  teamSize: number;
  riskLevel: 'low' | 'medium' | 'high';
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
}

// Error Boundary Component
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error: Error | null }> {
  state: { hasError: boolean; error: Error | null } = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography color="error" variant="h6">
            Something went wrong.
          </Typography>
          <Typography>{this.state.error?.message}</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => window.location.reload()}
            sx={{ mt: 2 }}
          >
            Retry
          </Button>
        </Box>
      );
    }
    return this.props.children;
  }
}

const ProjectPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [filteredLessons, setFilteredLessons] = useState<Lesson[]>([]);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const rowsPerPage = 6;

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
            name: 'Vehicle Inspection System',
            status: 'active',
            startDate: '2023-01-15',
            endDate: '2023-12-31',
            teamSize: 8,
            riskLevel: 'medium',
            lessonsCount: 12,
            isFavorite: true,
          },
          {
            id: 2,
            name: 'Retrospective Tracker',
            status: 'active',
            startDate: '2023-03-10',
            endDate: '2023-11-30',
            teamSize: 5,
            riskLevel: 'low',
            lessonsCount: 8,
            isFavorite: false,
          },
          {
            id: 3,
            name: 'Admin Portal Redesign',
            status: 'completed',
            startDate: '2022-11-01',
            endDate: '2023-05-15',
            teamSize: 6,
            riskLevel: 'high',
            lessonsCount: 15,
            isFavorite: true,
          },
          {
            id: 4,
            name: 'Notification Service',
            status: 'on-hold',
            startDate: '2023-04-20',
            endDate: '2023-10-15',
            teamSize: 3,
            riskLevel: 'high',
            lessonsCount: 5,
            isFavorite: false,
          },
          {
            id: 5,
            name: 'Data Analytics Dashboard',
            status: 'active',
            startDate: '2023-02-01',
            endDate: '2023-09-30',
            teamSize: 7,
            riskLevel: 'medium',
            lessonsCount: 10,
            isFavorite: false,
          },
        ];

        // Mock data for lessons learned
        const mockLessons: Lesson[] = [
          {
            id: 1,
            projectId: 1,
            projectName: 'Vehicle Inspection System',
            category: 'Testing',
            description: 'Need to implement more rigorous testing for edge cases in vehicle inspection workflow',
            dateRecorded: '2023-05-10',
            isConfidential: false,
            tags: ['testing', 'quality'],
          },
          {
            id: 2,
            projectId: 1,
            projectName: 'Vehicle Inspection System',
            category: 'Documentation',
            description: 'API documentation was incomplete which delayed frontend integration',
            dateRecorded: '2023-04-22',
            isConfidential: false,
            tags: ['documentation', 'api'],
          },
          {
            id: 3,
            projectId: 2,
            projectName: 'Retrospective Tracker',
            category: 'UI/UX',
            description: 'Users found the lesson entry form too complex, needs simplification',
            dateRecorded: '2023-06-05',
            isConfidential: false,
            tags: ['ui', 'ux'],
          },
          {
            id: 4,
            projectId: 3,
            projectName: 'Admin Portal Redesign',
            category: 'Security',
            description: 'Need to implement more granular permission controls for admin functions',
            dateRecorded: '2023-03-18',
            isConfidential: true,
            tags: ['security', 'admin'],
          },
          {
            id: 5,
            projectId: 5,
            projectName: 'Data Analytics Dashboard',
            category: 'Performance',
            description: 'Dashboard loading times were unacceptable with large datasets, need optimization',
            dateRecorded: '2023-05-30',
            isConfidential: false,
            tags: ['performance', 'optimization'],
          },
        ];

        // Mock dashboard stats
        const mockStats: DashboardStats = {
          totalProjects: 5,
          activeProjects: 3,
          lessonsRecorded: 50,
        };

        setProjects(mockProjects);
        setLessons(mockLessons);
        setFilteredProjects(mockProjects);
        setFilteredLessons(mockLessons);
        setDashboardStats(mockStats);
      } catch (err) {
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
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

    if (statusFilter !== 'all') {
      filtered = filtered.filter((project) => project.status === statusFilter);
    }

    setFilteredProjects(filtered);
  }, [searchQuery, statusFilter, projects]);

  useEffect(() => {
    let filtered = lessons;

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(
        (lesson) => lesson.category.toLowerCase() === categoryFilter.toLowerCase(),
      );
    }

    setFilteredLessons(filtered);
  }, [categoryFilter, lessons]);

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
      active: { color: 'success', icon: <ActiveIcon /> },
      completed: { color: 'primary', icon: <CheckCircleIcon /> },
      'on-hold': { color: 'warning', icon: <AtRiskIcon /> },
    };

    const statusConfig = statusMap[status as keyof typeof statusMap] || {
      color: 'default',
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
      low: { color: 'success', icon: <LowPriorityIcon /> },
      medium: { color: 'warning', icon: <TrendingIcon /> },
      high: { color: 'error', icon: <HighPriorityIcon /> },
    };

    const riskConfig = riskMap[riskLevel as keyof typeof riskMap] || {
      color: 'default',
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
      field: 'isFavorite',
      headerName: '',
      width: 60,
      minWidth: 50,
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
      field: 'name',
      headerName: 'Project Name',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, whiteSpace: 'normal', wordBreak: 'break-word' }}>
          <ProjectIcon color="primary" fontSize="small" />
          <Typography variant="body2">{params.row.name}</Typography>
        </Box>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 0.5,
      minWidth: 100,
      renderCell: (params) => getStatusChip(params.value),
    },
    {
      field: 'riskLevel',
      headerName: 'Risk Level',
      flex: 0.5,
      minWidth: 100,
      renderCell: (params) => getRiskChip(params.value),
    },
    {
      field: 'teamSize',
      headerName: 'Team',
      flex: 0.4,
      minWidth: 80,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TeamIcon color="action" fontSize="small" />
          {params.value}
        </Box>
      ),
    },
    {
      field: 'lessonsCount',
      headerName: 'Lessons',
      flex: 0.4,
      minWidth: 80,
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
      field: 'actions',
      headerName: 'Actions',
      flex: 0.6,
      minWidth: 120,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <IconButton
            color="primary"
            size="small"
            onClick={() => navigate(`/projects/${params.row.id}`)}
            title="Edit"
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            color="error"
            size="small"
            onClick={() =>
              setProjects(projects.filter((project) => project.id !== params.row.id))
            }
            title="Delete"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
          <IconButton
            color="info"
            size="small"
            onClick={() => navigate(`/projects/${params.row.id}/retrospective`)}
            title="View"
          >
            <ViewIcon fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ];

  const lessonColumns: GridColDef[] = [
    {
      field: 'projectName',
      headerName: 'Project',
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, whiteSpace: 'normal', wordBreak: 'break-word' }}>
          <ProjectIcon sx={{ fontSize: { xs: 20, sm: 24 }, color: 'primary.main' }} />
          <Typography variant="body2" sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
            {params.value}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'category',
      headerName: 'Category',
      flex: 0.5,
      minWidth: 80,
      renderCell: (params) => (
        <Chip label={params.value} color="primary" size="small" variant="outlined" />
      ),
    },
    {
      field: 'description',
      headerName: 'Lesson Learned',
      flex: 1.5,
      minWidth: 150,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'tags',
      headerName: 'Tags',
      flex: 0.8,
      minWidth: 100,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
          {params.value.map((tag: string, index: number) => (
            <Chip key={index} label={tag} size="small" variant="outlined" />
          ))}
        </Box>
      ),
    },
    {
      field: 'dateRecorded',
      headerName: 'Date',
      flex: 0.5,
      minWidth: 80,
    },
    {
      field: 'isConfidential',
      headerName: 'Confidential',
      flex: 0.4,
      minWidth: 80,
      renderCell: (params) =>
        params.value ? <SecureIcon color="error" fontSize="small" /> : <span>-</span>,
    },
  ];

  if (error) {
    return (
      <Box
        sx={{
          p: { xs: 2, sm: 3 },
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          width: '100%',
          maxWidth: '100%',
        }}
      >
        <Paper sx={{ p: 3, textAlign: 'center', width: '100%', maxWidth: { xs: '90%', sm: '600px' } }}>
          <Typography color="error" variant="h6" gutterBottom>
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
    <ErrorBoundary>
      <Box
        sx={{
          p: { xs: 2, sm: 3 },
          minHeight: '100vh',
          width: '100%',
          maxWidth: '100%',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'stretch', sm: 'center' },
            mb: { xs: 2, sm: 3 },
            gap: 2,
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontSize: { xs: '1.5rem', sm: '2.125rem' },
              mb: { xs: 2, sm: 0 },
            }}
          >
            Project Retrospective Dashboard
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 1,
              width: { xs: '100%', sm: 'auto' },
            }}
          >
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate('/projects/new')}
              sx={{ width: { xs: '100%', sm: 'auto' }, mb: { xs: 1, sm: 0 } }}
            >
              New Project
            </Button>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => navigate('/lessons/new')}
              sx={{ width: { xs: '100%', sm: 'auto' } }}
            >
              Add Lesson
            </Button>
          </Box>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4, flex: 1 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: { xs: 2, sm: 3 } }}>
            {/* Dashboard Stats Cards */}
            <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: { xs: 2, sm: 3 } }}>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardHeader
                    title="Total Projects"
                    avatar={<ProjectIcon color="primary" />}
                    titleTypographyProps={{ variant: 'h6', fontSize: { xs: '1rem', sm: '1.25rem' } }}
                  />
                  <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h4" sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
                      {dashboardStats?.totalProjects || 0}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardHeader
                    title="Active Projects"
                    avatar={<ActiveIcon color="success" />}
                    titleTypographyProps={{ variant: 'h6', fontSize: { xs: '1rem', sm: '1.25rem' } }}
                  />
                  <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h4" sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
                      {dashboardStats?.activeProjects || 0}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardHeader
                    title="Lessons Recorded"
                    avatar={<ListIcon color="info" />}
                    titleTypographyProps={{ variant: 'h6', fontSize: { xs: '1rem', sm: '1.25rem' } }}
                  />
                  <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h4" sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
                      {dashboardStats?.lessonsRecorded || 0}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Projects Section */}
            <Paper sx={{ p: { xs: 2, sm: 3 }, width: '100%', boxSizing: 'border-box' }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  justifyContent: 'space-between',
                  alignItems: { xs: 'stretch', sm: 'center' },
                  mb: 2,
                  gap: 2,
                }}
              >
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}
                >
                  Projects
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: 1,
                    width: { xs: '100%', sm: 'auto' },
                  }}
                >
                  <TextField
                    size="small"
                    placeholder="Search projects..."
                    InputProps={{
                      startAdornment: <SearchIcon color="action" />,
                    }}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{
                      width: { xs: '100%', sm: 200 },
                      mb: { xs: 1, sm: 0 },
                    }}
                  />
                  <FormControl
                    size="small"
                    sx={{
                      width: { xs: '100%', sm: 120 },
                      minWidth: 120,
                    }}
                  >
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

              {filteredProjects.length === 0 ? (
                <Typography
                  variant="body1"
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                  }}
                >
                  No projects found.
                </Typography>
              ) : (
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
                  sx={{
                    width: '100%',
                    maxWidth: '100%',
                    overflowX: 'auto',
                    '& .MuiDataGrid-root': {
                      fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    },
                    '& .MuiDataGrid-cell': {
                      padding: { xs: '4px', sm: '8px' },
                    },
                    '& .MuiDataGrid-columnHeaderTitle': {
                      fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    },
                  }}
                />
              )}
            </Paper>

            {/* Lessons Learned Section */}
            <Paper sx={{ p: { xs: 2, sm: 3 }, width: '100%', boxSizing: 'border-box' }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  justifyContent: 'space-between',
                  alignItems: { xs: 'stretch', sm: 'center' },
                  mb: 2,
                  gap: 2,
                }}
              >
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}
                >
                  Recent Lessons Learned
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: 1,
                    width: { xs: '100%', sm: 'auto' },
                  }}
                >
                  <TextField
                    size="small"
                    placeholder="Search lessons..."
                    InputProps={{
                      startAdornment: <SearchIcon color="action" />,
                    }}
                    sx={{
                      width: { xs: '100%', sm: 200 },
                      mb: { xs: 1, sm: 0 },
                    }}
                  />
                  <FormControl
                    size="small"
                    sx={{
                      width: { xs: '100%', sm: 180 },
                      minWidth: 120,
                    }}
                  >
                    <InputLabel>Filter by Category</InputLabel>
                    <Select
                      value={categoryFilter}
                      label="Filter by Category"
                      onChange={handleCategoryFilterChange}
                    >
                      <MenuItem value="all">All Categories</MenuItem>
                      {Array.from(new Set(lessons.map((lesson) => lesson.category))).map(
                        (category) => (
                          <MenuItem key={category} value={category}>
                            {category}
                          </MenuItem>
                        ),
                      )}
                    </Select>
                  </FormControl>
                </Box>
              </Box>

              {filteredLessons.length === 0 ? (
                <Typography
                  variant="body1"
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                  }}
                >
                  No lessons found.
                </Typography>
              ) : (
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
                  sx={{
                    width: '100%',
                    maxWidth: '100%',
                    overflowX: 'auto',
                    '& .MuiDataGrid-root': {
                      fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    },
                    '& .MuiDataGrid-cell': {
                      padding: { xs: '4px', sm: '8px' },
                    },
                    '& .MuiDataGrid-columnHeaderTitle': {
                      fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    },
                  }}
                />
              )}
            </Paper>
          </Box>
        )}
      </Box>
    </ErrorBoundary>
  );
};

export default ProjectPage;