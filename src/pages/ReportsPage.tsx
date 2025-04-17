import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Typography,
  Paper,
  Divider,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  TextField,
  Button,
  IconButton,
  LinearProgress,
  Alert,
} from "@mui/material";
import {
  Download as DownloadIcon,
  Refresh as RefreshIcon,
  Share as ShareIcon,
  Print as PrintIcon,
} from "@mui/icons-material";

// Type definitions
interface ProjectData {
  id: number;
  name: string;
  lessons: number;
  positive: number;
  negative: number;
  neutral: number;
}

interface CategoryData {
  id: number;
  name: string;
  count: number;
  percentage: number;
}

interface TrendData {
  month: string;
  lessons: number;
  positive: number;
  negative: number;
}

interface LessonRow {
  id: number;
  title: string;
  project: string;
  category: string;
  impact: "positive" | "negative" | "neutral";
  date: string;
}

type TimeRange = "last7" | "last30" | "last90" | "custom";
type ReportType = "all" | "lessons" | "projects" | "trends";

const ReportsPage = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [timeRange, setTimeRange] = useState<TimeRange>("last30");
  const [reportType, setReportType] = useState<ReportType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setLoading(false);
      } catch (err) {
        setError("Failed to load report data");
        setLoading(false);
      }
    };

    fetchData();
  }, [timeRange, reportType]);

  // Sample data
  const projectData: ProjectData[] = [
    {
      id: 1,
      name: "Digital Transformation",
      lessons: 24,
      positive: 18,
      negative: 4,
      neutral: 2,
    },
    {
      id: 2,
      name: "Product Launch",
      lessons: 15,
      positive: 10,
      negative: 3,
      neutral: 2,
    },
    {
      id: 3,
      name: "Process Optimization",
      lessons: 32,
      positive: 25,
      negative: 5,
      neutral: 2,
    },
    {
      id: 4,
      name: "Team Restructuring",
      lessons: 8,
      positive: 3,
      negative: 4,
      neutral: 1,
    },
  ];

  const categoryData: CategoryData[] = [
    { id: 1, name: "Communication", count: 28, percentage: 35 },
    { id: 2, name: "Planning", count: 22, percentage: 27.5 },
    { id: 3, name: "Execution", count: 18, percentage: 22.5 },
    { id: 4, name: "Risk Management", count: 12, percentage: 15 },
  ];

  return (
    <Box
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      {/* Header Section */}
      {loading && <LinearProgress />}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography variant="h4" component="h1">
          Reports & Analytics
        </Typography>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          <IconButton onClick={() => setLoading(!loading)}>
            <RefreshIcon />
          </IconButton>
          <Button variant="contained" startIcon={<DownloadIcon />}>
            Export
          </Button>
          <Button variant="outlined" startIcon={<PrintIcon />}>
            Print
          </Button>
        </Box>
      </Box>

      {/* Filters Section */}
      <Paper sx={{ p: 3 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "repeat(4, 1fr)",
            },
            gap: 2,
          }}
        >
          <FormControl fullWidth>
            <InputLabel>Time Range</InputLabel>
            <Select
              value={timeRange}
              label="Time Range"
              onChange={(e) => setTimeRange(e.target.value as TimeRange)}
            >
              <MenuItem value="last7">Last 7 Days</MenuItem>
              <MenuItem value="last30">Last 30 Days</MenuItem>
              <MenuItem value="last90">Last 90 Days</MenuItem>
              <MenuItem value="custom">Custom Range</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Report Type</InputLabel>
            <Select
              value={reportType}
              label="Report Type"
              onChange={(e) => setReportType(e.target.value as ReportType)}
            >
              <MenuItem value="all">All Reports</MenuItem>
              <MenuItem value="lessons">Lessons Learned</MenuItem>
              <MenuItem value="projects">Project Analysis</MenuItem>
              <MenuItem value="trends">Trend Analysis</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Search Reports"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <Button
            fullWidth
            variant="contained"
            color="secondary"
            startIcon={<ShareIcon />}
            sx={{ height: "56px" }}
          >
            Share Dashboard
          </Button>
        </Box>
      </Paper>

      {/* Tabs Section */}
      <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
        <Tab label="Overview" />
        <Tab label="Project Analysis" />
        <Tab label="Category Breakdown" />
        <Tab label="Trends" />
        <Tab label="Detailed List" />
      </Tabs>

      {/* Tab Content */}
      <Box sx={{ pt: 2 }}>
        {loading ? (
          <Box
            sx={{
              height: 400,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <CircularProgress />
            <Typography variant="body2" color="text.secondary">
              Loading report data...
            </Typography>
          </Box>
        ) : (
          <>
            {tabValue === 0 && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                }}
              >
                {/* Summary Cards */}
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr",
                      sm: "1fr 1fr",
                      md: "repeat(4, 1fr)",
                    },
                    gap: 2,
                  }}
                >
                  <Paper sx={{ p: 3, textAlign: "center" }}>
                    <Typography variant="h5" color="primary">
                      42
                    </Typography>
                    <Typography variant="subtitle2">Total Lessons</Typography>
                  </Paper>
                  <Paper sx={{ p: 3, textAlign: "center" }}>
                    <Typography
                      variant="h5"
                      sx={{ color: theme.palette.success.main }}
                    >
                      32
                    </Typography>
                    <Typography variant="subtitle2">Positive Impact</Typography>
                  </Paper>
                  <Paper sx={{ p: 3, textAlign: "center" }}>
                    <Typography
                      variant="h5"
                      sx={{ color: theme.palette.error.main }}
                    >
                      7
                    </Typography>
                    <Typography variant="subtitle2">Negative Impact</Typography>
                  </Paper>
                  <Paper sx={{ p: 3, textAlign: "center" }}>
                    <Typography
                      variant="h5"
                      sx={{ color: theme.palette.warning.main }}
                    >
                      3
                    </Typography>
                    <Typography variant="subtitle2">Neutral Impact</Typography>
                  </Paper>
                </Box>

                {/* Main Charts */}
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                    gap: 2,
                  }}
                >
                  <Paper sx={{ p: 2, height: "400px" }}>
                    <Typography variant="h6" gutterBottom>
                      Lessons by Project
                    </Typography>
                    {/* Chart placeholder */}
                    <Box
                      sx={{
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: theme.palette.grey[100],
                      }}
                    >
                      Bar Chart Placeholder
                    </Box>
                  </Paper>
                  <Paper sx={{ p: 2, height: "400px" }}>
                    <Typography variant="h6" gutterBottom>
                      Lessons by Category
                    </Typography>
                    {/* Chart placeholder */}
                    <Box
                      sx={{
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: theme.palette.grey[100],
                      }}
                    >
                      Pie Chart Placeholder
                    </Box>
                  </Paper>
                </Box>
              </Box>
            )}

            {tabValue === 1 && (
              <Paper sx={{ p: 2, height: "500px" }}>
                <Typography variant="h6" gutterBottom>
                  Project Analysis
                </Typography>
                {/* Chart placeholder */}
                <Box
                  sx={{
                    height: "calc(100% - 40px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: theme.palette.grey[100],
                  }}
                >
                  Project Analysis Chart Placeholder
                </Box>
              </Paper>
            )}

            {tabValue === 2 && (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                  gap: 2,
                }}
              >
                <Paper sx={{ p: 2, height: "400px" }}>
                  <Typography variant="h6" gutterBottom>
                    Category Distribution
                  </Typography>
                  {/* Chart placeholder */}
                  <Box
                    sx={{
                      height: "calc(100% - 40px)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: theme.palette.grey[100],
                    }}
                  >
                    Category Chart Placeholder
                  </Box>
                </Paper>
                <Paper sx={{ p: 2, height: "400px" }}>
                  <Typography variant="h6" gutterBottom>
                    Category Details
                  </Typography>
                  {/* Data placeholder */}
                  <Box
                    sx={{
                      height: "calc(100% - 40px)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: theme.palette.grey[100],
                    }}
                  >
                    Data Table Placeholder
                  </Box>
                </Paper>
              </Box>
            )}
          </>
        )}
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Export Options */}
      <Typography variant="h6" gutterBottom>
        Export Options
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 4, flexWrap: "wrap" }}>
        <Button variant="outlined" startIcon={<DownloadIcon />}>
          PDF Report
        </Button>
        <Button variant="outlined" startIcon={<DownloadIcon />}>
          CSV Data
        </Button>
        <Button variant="outlined" startIcon={<DownloadIcon />}>
          Excel Spreadsheet
        </Button>
      </Box>
    </Box>
  );
};

export default ReportsPage;
