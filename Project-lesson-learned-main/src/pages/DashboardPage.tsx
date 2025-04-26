import React from "react";
import {
  Grid as MuiGrid,
  Typography,
  Box,
  useTheme,
  Card,
  CardContent,
  Divider,
  styled,
  Paper,
  InputBase,
  IconButton,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
} from "@mui/material";
import {
  Search,
  FilterList,
  CalendarToday,
  ArrowUpward,
  ArrowDownward,
  Remove,
  Check,
  Close,
  Share,
  FileDownload,
  MoreVert,
  AccessTime,
} from "@mui/icons-material";

const GridContainer = ({ children, ...props }: any) => (
  <MuiGrid container {...props}>
    {children}
  </MuiGrid>
);

const GridItem = ({ children, ...props }: any) => (
  <MuiGrid item {...props}>
    {children}
  </MuiGrid>
);

// Icons
const SearchIcon = Search;
const FilterIcon = FilterList;
const CalendarIcon = CalendarToday;
const PositiveIcon = ArrowUpward;
const NegativeIcon = ArrowDownward;
const NeutralIcon = Remove;
const ApproveIcon = Check;
const RejectIcon = Close;
const ShareIcon = Share;
const ExportIcon = FileDownload;
const MoreIcon = MoreVert;
const PendingIcon = AccessTime;

const DashboardCard = styled(Card)(({ theme }) => ({
  borderRadius: "12px",
  boxShadow: theme.shadows[3],
  transition: "transform 0.2s, box-shadow 0.2s",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: theme.shadows[6],
  },
  height: "100%",
  display: "flex",
  flexDirection: "column",
}));

interface LessonCardProps {
  impact: string;
}

const LessonCard = styled(Card)<LessonCardProps>(({ theme, impact }) => ({
  borderRadius: "8px",
  boxShadow: theme.shadows[1],
  transition: "transform 0.2s, box-shadow 0.2s",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: theme.shadows[4],
  },
  height: "100%",
  borderLeft: `4px solid ${
    impact === "positive"
      ? theme.palette.success.main
      : impact === "negative"
        ? theme.palette.error.main
        : theme.palette.warning.main
  }`,
}));

const DashboardPage = () => {
  const theme = useTheme();

  const lessons = [
    {
      id: 1,
      title: "Effective Stakeholder Communication",
      description:
        "Weekly status reports improved stakeholder engagement by 40% compared to bi-weekly reports.",
      category: "Project Management",
      subCategory: "Communication",
      date: "2 days ago",
      tags: ["communication", "stakeholders", "reporting"],
      impact: "positive",
      status: "approved",
    },
    {
      id: 2,
      title: "API Integration Failure",
      description:
        "Third-party API rate limits caused system outages during peak hours.",
      category: "Technical Solution",
      subCategory: "Integration",
      date: "1 week ago",
      tags: ["API", "integration", "performance"],
      impact: "negative",
      status: "approved",
    },
    {
      id: 3,
      title: "Document Version Control",
      description:
        "Centralized document repository with strict version control reduced confusion.",
      category: "Business Process",
      subCategory: "Knowledge Management",
      date: "3 weeks ago",
      tags: ["documentation", "version-control"],
      impact: "neutral",
      status: "approved",
    },
    {
      id: 4,
      title: "Risk Management Approach",
      description:
        "Early identification of risks in the requirements phase saved 20% of potential rework costs.",
      category: "Project Management",
      subCategory: "Risk",
      date: "Pending Approval",
      tags: ["risk", "requirements"],
      impact: "positive",
      status: "pending",
    },
  ];

  const ImpactIcon = ({ impact }: { impact: string }) => {
    switch (impact) {
      case "positive":
        return <PositiveIcon color="success" fontSize="small" />;
      case "negative":
        return <NegativeIcon color="error" fontSize="small" />;
      default:
        return <NeutralIcon color="warning" fontSize="small" />;
    }
  };

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 3, md: 4 },
        backgroundColor: theme.palette.grey[50],
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 700,
              color: theme.palette.primary.dark,
              mb: 1,
            }}
          >
            Lessons Learned Dashboard
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: theme.palette.text.secondary,
            }}
          >
            Comprehensive view of project insights and retrospectives
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<ExportIcon />}
          >
            Export
          </Button>
          <Button variant="outlined" color="primary" startIcon={<ShareIcon />}>
            Share
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<FilterIcon />}
          >
            <CalendarIcon sx={{ mr: 1 }} />
            This Week
          </Button>
        </Box>
      </Box>

      {/* Search and Filter Section */}
      <DashboardCard sx={{ mb: 4 }}>
        <CardContent>
          <GridContainer spacing={2}>
            <GridItem xs={12} md={8}>
              <Paper
                component="form"
                sx={{
                  p: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  boxShadow: "none",
                  border: `1px solid ${theme.palette.divider}`,
                }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search lessons..."
                  inputProps={{ "aria-label": "search lessons" }}
                />
                <IconButton
                  type="submit"
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
              </Paper>
            </GridItem>
            <GridItem xs={12} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Sort By</InputLabel>
                <Select label="Sort By" defaultValue="date-desc">
                  <MenuItem value="date-desc">Date Added (Newest)</MenuItem>
                  <MenuItem value="date-asc">Date Added (Oldest)</MenuItem>
                  <MenuItem value="status">Approval Status</MenuItem>
                  <MenuItem value="impact">Impact Level</MenuItem>
                  <MenuItem value="project">Project Name</MenuItem>
                </Select>
              </FormControl>
            </GridItem>
            <GridItem xs={12} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Category</InputLabel>
                <Select label="Category" defaultValue="all">
                  <MenuItem value="all">All Categories</MenuItem>
                  <MenuItem value="business">Business Process</MenuItem>
                  <MenuItem value="pm">Project Management</MenuItem>
                  <MenuItem value="technical">Technical Solution</MenuItem>
                </Select>
              </FormControl>
            </GridItem>
            <GridItem xs={12} md={4}>
              <FormControl fullWidth size="small" disabled>
                <InputLabel>Sub-Category</InputLabel>
                <Select label="Sub-Category">
                  <MenuItem value="">Select Category first</MenuItem>
                </Select>
              </FormControl>
            </GridItem>
            <GridItem xs={12} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Impact Type</InputLabel>
                <Select label="Impact Type" defaultValue="all">
                  <MenuItem value="all">All Impact Types</MenuItem>
                  <MenuItem value="positive">Positive</MenuItem>
                  <MenuItem value="negative">Negative</MenuItem>
                  <MenuItem value="neutral">Neutral</MenuItem>
                </Select>
              </FormControl>
            </GridItem>
          </GridContainer>
        </CardContent>
      </DashboardCard>

      {/* Quick Stats */}
      <Box sx={{ display: "flex", gap: 2, mb: 4, flexWrap: "wrap" }}>
        <DashboardCard sx={{ flex: 1, minWidth: "200px" }}>
          <CardContent>
            <Typography variant="h6" color="text.secondary">
              Total Lessons
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              247
            </Typography>
          </CardContent>
        </DashboardCard>
        <DashboardCard sx={{ flex: 1, minWidth: "200px" }}>
          <CardContent>
            <Typography variant="h6" color="text.secondary">
              Pending Approval
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              12
            </Typography>
          </CardContent>
        </DashboardCard>
        <DashboardCard sx={{ flex: 1, minWidth: "200px" }}>
          <CardContent>
            <Typography variant="h6" color="text.secondary">
              This Month
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              18
            </Typography>
          </CardContent>
        </DashboardCard>
      </Box>

      {/* Lessons List */}
      <GridContainer spacing={3}>
        {lessons.map((lesson) => (
          <GridItem key={lesson.id} xs={12} sm={6} md={4} lg={3}>
            <LessonCard impact={lesson.impact}>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    mb: 2,
                  }}
                >
                  <Chip
                    label={lesson.category}
                    size="small"
                    color={
                      lesson.category === "Business Process"
                        ? "default"
                        : lesson.category === "Project Management"
                          ? "primary"
                          : "secondary"
                    }
                  />
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {lesson.status === "pending" ? (
                      <PendingIcon
                        color="action"
                        fontSize="small"
                        sx={{ mr: 0.5 }}
                      />
                    ) : null}
                    {lesson.date}
                  </Typography>
                </Box>

                <Typography variant="h6" component="h3" sx={{ mb: 1 }}>
                  {lesson.title}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {lesson.description}
                </Typography>

                <Box sx={{ mb: 2 }}>
                  {lesson.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      variant="outlined"
                      sx={{ mr: 0.5, mb: 0.5 }}
                    />
                  ))}
                </Box>

                <Divider sx={{ my: 1 }} />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <ImpactIcon impact={lesson.impact} />
                    <Typography variant="caption" sx={{ ml: 0.5 }}>
                      {lesson.impact === "positive"
                        ? "Positive"
                        : lesson.impact === "negative"
                          ? "Negative"
                          : "Neutral"}{" "}
                      Impact
                    </Typography>
                  </Box>

                  {lesson.status === "pending" ? (
                    <Box>
                      <IconButton size="small" color="success">
                        <ApproveIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" color="error">
                        <RejectIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  ) : (
                    <Button
                      size="small"
                      variant="outlined"
                      endIcon={<MoreIcon />}
                    >
                      Details
                    </Button>
                  )}
                </Box>
              </CardContent>
            </LessonCard>
          </GridItem>
        ))}
      </GridContainer>

      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Paper sx={{ p: 1 }}>
          <Button disabled sx={{ mx: 1 }}>
            Previous
          </Button>
          <Button variant="contained" sx={{ mx: 1 }}>
            1
          </Button>
          <Button sx={{ mx: 1 }}>2</Button>
          <Button sx={{ mx: 1 }}>3</Button>
          <Button sx={{ mx: 1 }}>Next</Button>
        </Paper>
      </Box>
    </Box>
  );
};

export default DashboardPage;
