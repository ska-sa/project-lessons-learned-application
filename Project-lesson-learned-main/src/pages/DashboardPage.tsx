import React, { useState } from "react";
import {
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
import { Grid } from "@mui/material";
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  CalendarToday as CalendarIcon,
  ArrowUpward as PositiveIcon,
  ArrowDownward as NegativeIcon,
  Remove as NeutralIcon,
  Check as ApproveIcon,
  Close as RejectIcon,
  Share as ShareIcon,
  FileDownload as ExportIcon,
  MoreVert as MoreIcon,
  AccessTime as PendingIcon,
} from "@mui/icons-material";

// Styled Components
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
  width: '100%',
  height: '380px',
  display: "flex",
  flexDirection: "column",
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
  
  // All available lessons
  const allLessons = [
    {
      id: 1,
      title: "Effective Stakeholder Communication",
      description: "Weekly status reports improved stakeholder engagement by 40% compared to bi-weekly reports.",
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
      description: "Third-party API rate limits caused system outages during peak hours.",
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
      description: "Centralized document repository with strict version control reduced confusion.",
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
      description: "Early identification of risks in the requirements phase saved 20% of potential rework costs.",
      category: "Project Management",
      subCategory: "Risk",
      date: "Pending Approval",
      tags: ["risk", "requirements"],
      impact: "positive",
      status: "pending",
    },
    {
      id: 5,
      title: "Agile Sprint Planning Improvements",
      description: "Implementing two-week sprints increased team velocity by 25% while improving focus.",
      category: "Project Management",
      subCategory: "Agile",
      date: "1 month ago",
      tags: ["agile", "sprint", "planning"],
      impact: "positive",
      status: "approved",
    },
    {
      id: 6,
      title: "Database Query Optimization",
      description: "Query optimization reduced report generation time from 5 minutes to 30 seconds.",
      category: "Technical Solution",
      subCategory: "Performance",
      date: "2 weeks ago",
      tags: ["database", "performance", "optimization"],
      impact: "positive",
      status: "approved",
    },
    {
      id: 7,
      title: "Meeting Efficiency Initiative",
      description: "Implementing strict agendas and timeboxes reduced meeting times by 40% without sacrificing outcomes.",
      category: "Business Process",
      subCategory: "Efficiency",
      date: "3 days ago",
      tags: ["meetings", "efficiency", "time-management"],
      impact: "positive",
      status: "approved",
    },
    {
      id: 8,
      title: "Vendor Communication Issues",
      description: "Poor vendor communication and delayed responses impacted project timeline by 2 weeks.",
      category: "Project Management",
      subCategory: "Vendor",
      date: "1 week ago",
      tags: ["vendor", "communication", "delays"],
      impact: "negative",
      status: "approved",
    },
    {
      id: 9,
      title: "Automated Testing Implementation",
      description: "CI/CD pipeline with automated testing reduced regression bugs by 60% in production.",
      category: "Technical Solution",
      subCategory: "Testing",
      date: "4 days ago",
      tags: ["automation", "testing", "ci-cd"],
      impact: "positive",
      status: "approved",
    },
    {
      id: 10,
      title: "Documentation Standards",
      description: "New documentation standards improved onboarding time for new team members by 35%.",
      category: "Business Process",
      subCategory: "Documentation",
      date: "2 weeks ago",
      tags: ["documentation", "onboarding", "standards"],
      impact: "positive",
      status: "approved",
    }
  ];

  const [visibleLessons, setVisibleLessons] = useState(4);
  const [lessons, setLessons] = useState(allLessons.slice(0, 4));

  const loadMoreLessons = () => {
    const nextVisible = Math.min(visibleLessons + 4, allLessons.length);
    setVisibleLessons(nextVisible);
    setLessons(allLessons.slice(0, nextVisible));
  };

  const ImpactIcon = ({ impact }: { impact: string }) => {
    switch (impact) {
      case "positive": return <PositiveIcon color="success" fontSize="small" />;
      case "negative": return <NegativeIcon color="error" fontSize="small" />;
      default: return <NeutralIcon color="warning" fontSize="small" />;
    }
  };

  return (
    <Box sx={{
      p: { xs: 2, sm: 3, md: 4 },
      backgroundColor: theme.palette.grey[100],
      minHeight: "100vh",
    }}>
      {/* Header */}
      <Box sx={{
        mb: 4,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 2,
      }}>
        <Box>
          <Typography variant="h4" component="h1" sx={{
            fontWeight: 700,
            color: theme.palette.primary.dark,
            mb: 1,
          }}>
            Lessons Learned Dashboard
          </Typography>
          <Typography variant="subtitle1" sx={{
            color: theme.palette.text.secondary,
          }}>
            Comprehensive view of project insights and retrospectives
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<ExportIcon />}
            sx={{
              borderRadius: "8px",
              textTransform: "none",
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            Export
          </Button>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<ShareIcon />}
            sx={{
              borderRadius: "8px",
              textTransform: "none",
              "&:hover": {
                borderColor: theme.palette.primary.dark,
                color: theme.palette.primary.dark,
              },
            }}
          >
            Share
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<FilterIcon />}
            sx={{
              borderRadius: "8px",
              textTransform: "none",
              "&:hover": {
                backgroundColor: theme.palette.secondary.dark,
              },
            }}
          >
            <CalendarIcon sx={{ mr: 1 }} />
            This Week
          </Button>
        </Box>
      </Box>

      {/* Search and Filter Section */}
      <DashboardCard sx={{ mb: 4, p: 3 }}>
        <CardContent sx={{ p: 0 }}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
            }}
          >
            <Box sx={{ flex: "1 1 100%" }}>
              <Paper
                component="form"
                sx={{
                  p: "4px 8px",
                  display: "flex",
                  alignItems: "center",
                  boxShadow: "none",
                  border: `1px solid ${theme.palette.grey[300]}`,
                  borderRadius: "8px",
                  backgroundColor: "white",
                }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1, fontSize: "0.875rem" }}
                  placeholder="Search lessons..."
                  inputProps={{ "aria-label": "search lessons" }}
                />
                <IconButton sx={{ p: "8px" }} aria-label="search">
                  <SearchIcon />
                </IconButton>
              </Paper>
            </Box>
            <Box sx={{ flex: "1 1 30%" }}>
              <FormControl fullWidth size="small">
                <InputLabel sx={{ fontSize: "0.875rem" }}>Sort By</InputLabel>
                <Select
                  label="Sort By"
                  defaultValue="date-desc"
                  sx={{ borderRadius: "8px", backgroundColor: "white" }}
                >
                  <MenuItem value="date-desc">Date Added (Newest)</MenuItem>
                  <MenuItem value="date-asc">Date Added (Oldest)</MenuItem>
                  <MenuItem value="status">Approval Status</MenuItem>
                  <MenuItem value="impact">Impact Level</MenuItem>
                  <MenuItem value="project">Project Name</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ flex: "1 1 30%" }}>
              <FormControl fullWidth size="small">
                <InputLabel sx={{ fontSize: "0.875rem" }}>Category</InputLabel>
                <Select
                  label="Category"
                  defaultValue="all"
                  sx={{ borderRadius: "8px", backgroundColor: "white" }}
                >
                  <MenuItem value="all">All Categories</MenuItem>
                  <MenuItem value="business">Business Process</MenuItem>
                  <MenuItem value="pm">Project Management</MenuItem>
                  <MenuItem value="technical">Technical Solution</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ flex: "1 1 30%" }}>
              <FormControl fullWidth size="small">
                <InputLabel sx={{ fontSize: "0.875rem" }}>Impact Type</InputLabel>
                <Select
                  label="Impact Type"
                  defaultValue="all"
                  sx={{ borderRadius: "8px", backgroundColor: "white" }}
                >
                  <MenuItem value="all">All Impact Types</MenuItem>
                  <MenuItem value="positive">Positive</MenuItem>
                  <MenuItem value="negative">Negative</MenuItem>
                  <MenuItem value="neutral">Neutral</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </CardContent>
      </DashboardCard>

      {/* Quick Stats */}
      <Box sx={{ display: "flex", gap: 3, mb: 4, flexWrap: "wrap" }}>
        <DashboardCard sx={{ flex: 1, minWidth: "200px" }}>
          <CardContent>
            <Typography variant="h6" color="text.secondary" sx={{ fontSize: "1rem" }}>
              Total Lessons
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {allLessons.length}
            </Typography>
          </CardContent>
        </DashboardCard>
        <DashboardCard sx={{ flex: 1, minWidth: "200px" }}>
          <CardContent>
            <Typography variant="h6" color="text.secondary" sx={{ fontSize: "1rem" }}>
              Pending Approval
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {allLessons.filter(l => l.status === "pending").length}
            </Typography>
          </CardContent>
        </DashboardCard>
        <DashboardCard sx={{ flex: 1, minWidth: "200px" }}>
          <CardContent>
            <Typography variant="h6" color="text.secondary" sx={{ fontSize: "1rem" }}>
              This Month
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {allLessons.filter(l => l.date.includes("week") || l.date.includes("days")).length}
            </Typography>
          </CardContent>
        </DashboardCard>
      </Box>

      {/* Lessons Grid */}
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '24px',
        mb: 4
      }}>
        {lessons.map((lesson) => (
          <LessonCard key={lesson.id} impact={lesson.impact}>
            <CardContent sx={{ 
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              p: 2,
              '&:last-child': { pb: 2 }
            }}>
              <Box sx={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 1.5,
                minHeight: '32px'
              }}>
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
                  sx={{ fontSize: "0.75rem" }}
                />
                <Typography variant="caption" color="text.secondary" sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '0.75rem'
                }}>
                  {lesson.status === "pending" && (
                    <PendingIcon color="action" fontSize="small" sx={{ mr: 0.5 }} />
                  )}
                  {lesson.date}
                </Typography>
              </Box>

              <Typography variant="h6" component="h3" sx={{
                mb: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                minHeight: '56px',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                {lesson.title}
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{
                mb: 2,
                fontSize: '0.875rem',
                flex: 1,
                minHeight: '72px',
                display: '-webkit-box',
                WebkitLineClamp: 4,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                {lesson.description}
              </Typography>

              <Box sx={{ 
                mb: 2,
                minHeight: '40px',
                display: 'flex',
                flexWrap: 'wrap',
                alignContent: 'flex-start'
              }}>
                {lesson.tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    variant="outlined"
                    sx={{ mr: 0.5, mb: 0.5, fontSize: '0.75rem' }}
                  />
                ))}
              </Box>

              <Divider sx={{ my: 1 }} />

              <Box sx={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                minHeight: '36px'
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ImpactIcon impact={lesson.impact} />
                  <Typography variant="caption" sx={{ ml: 0.5, fontSize: '0.75rem' }}>
                    {lesson.impact === "positive"
                      ? "Positive"
                      : lesson.impact === "negative"
                        ? "Negative"
                        : "Neutral"} Impact
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
                    sx={{
                      textTransform: 'none',
                      fontSize: '0.75rem',
                      borderRadius: '8px',
                    }}
                  >
                    Details
                  </Button>
                )}
              </Box>
            </CardContent>
          </LessonCard>
        ))}
      </Box>

      {/* Show More Button */}
      {visibleLessons < allLessons.length && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button
            variant="outlined"
            onClick={loadMoreLessons}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: 600,
              borderWidth: '2px',
              '&:hover': {
                backgroundColor: theme.palette.primary.light,
                color: theme.palette.primary.dark,
                borderWidth: '2px'
              }
            }}
          >
            Show More Lessons
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default DashboardPage;