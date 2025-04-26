import React from "react";
import {
  Box,
  Typography,
  Paper,
  Chip,
  Divider,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  useTheme,
  Tabs,
  Tab,
  TextField,
  Stack,
  Grid,
} from "@mui/material";
import { useParams } from "react-router-dom";
import {
  ArrowUpward as PositiveIcon,
  ArrowDownward as NegativeIcon,
  Remove as NeutralIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Share as ShareIcon,
  FileDownload as ExportIcon,
  Description as DescriptionIcon,
  InsertDriveFile as FileIcon,
  Image as ImageIcon,
  FileDownload as FileDownloadIcon,
  Comment as CommentIcon,
  History as HistoryIcon,
  CheckCircle as ApprovedIcon,
  Person as PersonIcon,
  DateRange as DateIcon,
} from "@mui/icons-material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`lesson-tabpanel-${index}`}
      aria-labelledby={`lesson-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `lesson-tab-${index}`,
    "aria-controls": `lesson-tabpanel-${index}`,
  };
}

const LessonDetailPage = () => {
  const { id } = useParams();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [comment, setComment] = React.useState("");
  const [isEditing, setIsEditing] = React.useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // This would normally come from an API call
  const lesson = {
    id,
    title: "Effective Stakeholder Communication",
    description:
      "Weekly status reports improved stakeholder engagement by 40% compared to bi-weekly reports. The more frequent communication helped identify issues earlier and kept stakeholders better informed.",
    project: "Digital Transformation Initiative",
    dateCaptured: "2023-05-15",
    dateApproved: "2023-05-18",
    category: "Project Management",
    subCategory: "Stakeholder Engagement",
    impact: "positive",
    status: "approved",
    rootCause:
      "Previous bi-weekly reporting cadence was insufficient for the fast-paced nature of the project, leading to stakeholders feeling out of touch with progress and issues.",
    outcomes:
      "Implemented weekly reports with standardized format including: key accomplishments, upcoming milestones, risks/issues, and decisions needed. This reduced follow-up questions by 60% and improved stakeholder satisfaction scores.",
    suggestedActions: [
      "Establish communication frequency based on project complexity and stakeholder needs",
      "Standardize report format for consistency",
      "Include clear calls-to-action in each report",
      "Gather feedback periodically on report usefulness",
    ],
    tags: ["communication", "stakeholders", "reporting", "engagement"],
    submittedBy: {
      name: "John Smith",
      avatar: "JS",
      role: "Project Coordinator",
    },
    approvedBy: {
      name: "Sarah Johnson",
      avatar: "SJ",
      role: "Project Manager",
    },
    relatedDocuments: [
      { name: "Communication Plan.pdf", type: "pdf" },
      { name: "Stakeholder Analysis.xlsx", type: "excel" },
    ],
    comments: [
      {
        author: "Michael Brown",
        avatar: "MB",
        date: "2023-05-20",
        text: "This approach worked well for our team too. We added a section for action items which further improved accountability.",
      },
      {
        author: "Lisa Wong",
        avatar: "LW",
        date: "2023-05-22",
        text: "Would recommend including a visual progress indicator in future versions.",
      },
    ],
    history: [
      {
        action: "Created",
        by: "John Smith",
        date: "2023-05-15",
      },
      {
        action: "Updated",
        by: "John Smith",
        date: "2023-05-16",
      },
      {
        action: "Approved",
        by: "Sarah Johnson",
        date: "2023-05-18",
      },
    ],
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle comment submission
    setComment("");
  };

  const getImpactIcon = () => {
    switch (lesson.impact) {
      case "positive":
        return <PositiveIcon color="success" />;
      case "negative":
        return <NegativeIcon color="error" />;
      default:
        return <NeutralIcon color="warning" />;
    }
  };

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <DescriptionIcon />;
      case "excel":
        return <FileIcon />;
      case "image":
        return <ImageIcon />;
      default:
        return <FileIcon />;
    }
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
      {/* Header with actions */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography variant="h3" component="h1" sx={{ fontWeight: 700 }}>
          {lesson.title}
        </Typography>

        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Cancel Edit" : "Edit"}
          </Button>
          <Button variant="outlined" color="error" startIcon={<DeleteIcon />}>
            Delete
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<ShareIcon />}
          >
            Share
          </Button>
          <Button variant="outlined" startIcon={<ExportIcon />}>
            Export
          </Button>
        </Stack>
      </Box>

      {/* Main content */}
      <Grid container spacing={3} component="div" {...({} as any)}>
        {/* Left column - Lesson details */}
        <Grid item xs={12} md={8} component="div" {...({} as any)}>
          <Paper sx={{ p: 3, mb: 3 }}>
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
              <Typography variant="subtitle1" color="text.secondary">
                Project: <strong>{lesson.project}</strong> | Date Captured:{" "}
                <strong>{lesson.dateCaptured}</strong>
              </Typography>

              <Box sx={{ display: "flex", gap: 1 }}>
                <Chip label={lesson.category} color="primary" size="small" />
                <Chip
                  label={lesson.subCategory}
                  variant="outlined"
                  size="small"
                />
                <Chip
                  icon={getImpactIcon()}
                  label={
                    lesson.impact === "positive"
                      ? "Positive"
                      : lesson.impact === "negative"
                        ? "Negative"
                        : "Neutral"
                  }
                  color={
                    lesson.impact === "positive"
                      ? "success"
                      : lesson.impact === "negative"
                        ? "error"
                        : "warning"
                  }
                  size="small"
                />
              </Box>
            </Box>

            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="Lesson details tabs"
            >
              <Tab label="Details" {...a11yProps(0)} />
              <Tab label="Comments" {...a11yProps(1)} />
              <Tab label="History" {...a11yProps(2)} />
            </Tabs>

            <TabPanel value={value} index={0}>
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Description
                </Typography>
                {isEditing ? (
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    value={lesson.description}
                    variant="outlined"
                    sx={{ mb: 3 }}
                  />
                ) : (
                  <Typography paragraph>{lesson.description}</Typography>
                )}

                <Typography variant="h6" gutterBottom>
                  Root Cause
                </Typography>
                {isEditing ? (
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    value={lesson.rootCause}
                    variant="outlined"
                    sx={{ mb: 3 }}
                  />
                ) : (
                  <Typography paragraph>{lesson.rootCause}</Typography>
                )}

                <Typography variant="h6" gutterBottom>
                  Outcomes
                </Typography>
                {isEditing ? (
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    value={lesson.outcomes}
                    variant="outlined"
                    sx={{ mb: 3 }}
                  />
                ) : (
                  <Typography paragraph>{lesson.outcomes}</Typography>
                )}

                <Typography variant="h6" gutterBottom>
                  Suggested Actions
                </Typography>
                {isEditing ? (
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    value={lesson.suggestedActions.join("\n")}
                    variant="outlined"
                  />
                ) : (
                  <List dense>
                    {lesson.suggestedActions.map((action, index) => (
                      <ListItem key={index} sx={{ py: 0 }}>
                        <ListItemText primary={`• ${action}`} />
                      </ListItem>
                    ))}
                  </List>
                )}
              </Box>

              <Divider sx={{ my: 3 }} />

              <Box>
                <Typography variant="h6" gutterBottom>
                  Tags
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {lesson.tags.map((tag) => (
                    <Chip key={tag} label={tag} size="small" />
                  ))}
                </Box>
              </Box>
            </TabPanel>

            <TabPanel value={value} index={1}>
              <List>
                {lesson.comments.map((comment, index) => (
                  <ListItem key={index} alignItems="flex-start" sx={{ py: 2 }}>
                    <ListItemAvatar>
                      <Avatar>{comment.avatar}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={comment.author}
                      secondary={
                        <>
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.secondary"
                            sx={{ display: "block", mb: 1 }}
                          >
                            {comment.date}
                          </Typography>
                          {comment.text}
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>

              <Box
                component="form"
                onSubmit={handleCommentSubmit}
                sx={{ mt: 3 }}
              >
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add your comment..."
                  variant="outlined"
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 2 }}
                  startIcon={<CommentIcon />}
                >
                  Post Comment
                </Button>
              </Box>
            </TabPanel>

            <TabPanel value={value} index={2}>
              <List>
                {lesson.history.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: theme.palette.grey[300] }}>
                        <HistoryIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.action}
                      secondary={`By ${item.by} on ${item.date}`}
                    />
                  </ListItem>
                ))}
              </List>
            </TabPanel>
          </Paper>
        </Grid>

        {/* Right column - Metadata */}
        <Grid item xs={12} md={4} component="div" {...({} as any)}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Metadata
            </Typography>

            <List dense>
              <ListItem>
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      bgcolor: theme.palette.grey[200],
                      width: 32,
                      height: 32,
                    }}
                  >
                    <PersonIcon fontSize="small" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Submitted by"
                  secondary={`${lesson.submittedBy.name} (${lesson.submittedBy.role})`}
                />
              </ListItem>

              <ListItem>
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      bgcolor: theme.palette.grey[200],
                      width: 32,
                      height: 32,
                    }}
                  >
                    <DateIcon fontSize="small" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Date Submitted"
                  secondary={lesson.dateCaptured}
                />
              </ListItem>

              <ListItem>
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      bgcolor: theme.palette.success.light,
                      width: 32,
                      height: 32,
                    }}
                  >
                    <ApprovedIcon fontSize="small" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Approved by"
                  secondary={`${lesson.approvedBy.name} (${lesson.approvedBy.role}) on ${lesson.dateApproved}`}
                />
              </ListItem>

              <ListItem>
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      bgcolor: theme.palette.grey[200],
                      width: 32,
                      height: 32,
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Last Updated"
                  secondary={lesson.history[lesson.history.length - 1].date}
                />
              </ListItem>

              <ListItem>
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      bgcolor: theme.palette.grey[200],
                      width: 32,
                      height: 32,
                    }}
                  >
                    <FileIcon fontSize="small" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Confidential" secondary="No" />
              </ListItem>
            </List>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Related Documents
            </Typography>

            <List dense>
              {lesson.relatedDocuments.map((doc, index) => (
                <ListItem
                  key={index}
                  secondaryAction={
                    <IconButton edge="end" aria-label="download">
                      <FileDownloadIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: theme.palette.grey[200] }}>
                      {getDocumentIcon(doc.type)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={doc.name} />
                </ListItem>
              ))}
            </List>

            <Button fullWidth variant="outlined" sx={{ mt: 2 }}>
              Upload Document
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {isEditing && (
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            p: 2,
            bgcolor: "background.paper",
            boxShadow: 3,
            zIndex: theme.zIndex.drawer + 1,
            display: "flex",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Button variant="contained" color="primary" size="large">
            Save Changes
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default LessonDetailPage;
