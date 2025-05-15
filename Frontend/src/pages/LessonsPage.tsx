import React, { useState, FormEvent } from 'react';
import {
  Box,
  Typography,
  Paper,
  Chip,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tabs,
  Tab,
  TextField,
  Stack,
  useTheme,
} from '@mui/material';
import {
  Folder as FolderIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Description as DescriptionIcon,
  Comment as CommentIcon,
  History as HistoryIcon,
  Person as PersonIcon,
  DateRange as DateIcon,
  Share as ShareIcon,
  FileDownload as ExportIcon,
  ArrowUpward as PositiveIcon,
} from '@mui/icons-material';

interface Document {
  name: string;
  type: 'pdf' | 'excel' | 'doc' | 'image';
  size: string;
}

interface Comment {
  author: string;
  avatar: string;
  date: string;
  text: string;
}

interface History {
  action: string;
  by: string;
  date: string;
}

interface SubmittedBy {
  name: string;
  avatar: string;
  role: string;
}

interface Lesson {
  title: string;
  project: string;
  category: string;
  impact: 'positive' | 'negative' | 'neutral';
  description: string;
  rootCause: string;
  outcomes: string;
  suggestedActions: string[];
  tags: string[];
  submittedBy: SubmittedBy;
  dateCaptured: string;
  subCategory: string;
  relatedDocuments: Document[];
  comments: Comment[];
  history: History[];
}

const lessonData: Lesson = {
  title: 'Effective Stakeholder Communication',
  project: 'Digital Transformation Initiative',
  category: 'Project Management',
  impact: 'positive',
  description: 'Weekly status reports improved stakeholder engagement by 40% compared to bi-weekly reports.',
  rootCause: 'Previous bi-weekly reporting cadence was insufficient for the fast-paced nature of the project.',
  outcomes: 'Implemented weekly reports with standardized format including key accomplishments and risks.',
  suggestedActions: [
    'Establish communication frequency based on project complexity',
    'Standardize report format for consistency',
    'Include clear calls-to-action in each report',
  ],
  tags: ['communication', 'stakeholders', 'reporting'],
  submittedBy: { name: 'John Smith', avatar: 'JS', role: 'Project Coordinator' },
  dateCaptured: '2023-05-15',
  subCategory: 'Stakeholder Engagement',
  relatedDocuments: [
    { name: 'Communication Plan.pdf', type: 'pdf', size: '2.4 MB' },
    { name: 'Stakeholder Analysis.xlsx', type: 'excel', size: '1.8 MB' },
    { name: 'Meeting Notes.docx', type: 'doc', size: '0.5 MB' },
    { name: 'Project Timeline.png', type: 'image', size: '3.2 MB' },
  ],
  comments: [
    { author: 'Michael Brown', avatar: 'MB', date: '2023-05-20', text: 'This approach worked well for our team too.' },
    { author: 'Sarah Johnson', avatar: 'SJ', date: '2023-05-22', text: 'Would you be willing to share your report template?' },
  ],
  history: [
    { action: 'Created', by: 'John Smith', date: '2023-05-15' },
    { action: 'Approved', by: 'Lisa Wong', date: '2023-05-18' },
  ],
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => (
  <Box
    role="tabpanel"
    hidden={value !== index}
    id={`tabpanel-${index}`}
    aria-labelledby={`tab-${index}`}
    sx={{ p: { xs: 2, sm: 3 }, flex: 1, display: value === index ? 'flex' : 'none', flexDirection: 'column' }}
  >
    {children}
  </Box>
);

const a11yProps = (index: number) => ({
  id: `tab-${index}`,
  'aria-controls': `tabpanel-${index}`,
});

const LessonsPage: React.FC = () => {
  const theme = useTheme();
  const [tab, setTab] = useState<number>(0);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [comment, setComment] = useState<string>('');

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => setTab(newValue);

  const handleCommentSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (comment.trim()) setComment('');
  };

  const getImpactIcon = () => {
    switch (lessonData.impact) {
      case 'positive':
        return <PositiveIcon color="success" fontSize="small" />;
      default:
        return undefined;
    }
  };

  const getDocumentIcon = (type: Document['type']) => {
    const iconStyle = { fontSize: { xs: 20, sm: 24 }, color: theme.palette.text.secondary };
    switch (type) {
      case 'pdf':
      case 'excel':
      case 'doc':
      case 'image':
        return <DescriptionIcon sx={iconStyle} />;
      default:
        return <FolderIcon sx={iconStyle} />;
    }
  };

  const getDocumentColor = (type: Document['type']) => {
    switch (type) {
      case 'pdf':
        return theme.palette.error.main;
      case 'excel':
        return theme.palette.success.main;
      case 'doc':
        return theme.palette.info.main;
      case 'image':
        return theme.palette.warning.main;
      default:
        return theme.palette.grey[500];
    }
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 }, maxWidth: 1200, mx: 'auto', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h4" fontWeight={700}>{lessonData.title}</Typography>
        <Stack direction="row" spacing={1}>
          <Chip label={lessonData.category} color="primary" sx={{ fontWeight: 600 }} />
          <Chip
            icon={getImpactIcon()}
            label={lessonData.impact.charAt(0).toUpperCase() + lessonData.impact.slice(1)}
            variant="outlined"
            sx={{ fontWeight: 500 }}
          />
        </Stack>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: 3, flex: 1, minWidth: 0 }}>
        <Box sx={{ flex: '1 1 65%', maxWidth: { xs: '100%', lg: '65%' }, minWidth: 0 }}>
          <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2, boxShadow: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, flexWrap: 'wrap', gap: 2 }}>
              <Typography variant="subtitle1" fontWeight={600} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FolderIcon sx={{ color: 'primary.main' }} />
                Project: {lessonData.project}
              </Typography>
              <Stack direction="row" spacing={1}>
                <Button
                  variant="contained"
                  startIcon={<EditIcon />}
                  onClick={() => setIsEditing(!isEditing)}
                  size="small"
                >
                  {isEditing ? 'Cancel' : 'Edit'}
                </Button>
                <Button variant="outlined" color="error" startIcon={<DeleteIcon />} size="small">
                  Delete
                </Button>
              </Stack>
            </Box>

            <Tabs
              value={tab}
              onChange={handleTabChange}
              sx={{ mb: 2, '& .MuiTab-root': { textTransform: 'none', fontWeight: 500 } }}
            >
              <Tab label="Details" {...a11yProps(0)} />
              <Tab label={`Comments (${lessonData.comments.length})`} {...a11yProps(1)} />
              <Tab label="History" {...a11yProps(2)} />
            </Tabs>

            <TabPanel value={tab} index={0}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <DescriptionIcon sx={{ color: 'primary.main' }} />
                  Description
                </Typography>
                <Typography sx={{ bgcolor: 'grey.100', p: 2, borderRadius: 1 }}>{lessonData.description}</Typography>
              </Box>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <HistoryIcon sx={{ color: 'primary.main' }} />
                  Root Cause
                </Typography>
                <Typography sx={{ bgcolor: 'grey.100', p: 2, borderRadius: 1 }}>{lessonData.rootCause}</Typography>
              </Box>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <PositiveIcon sx={{ color: 'primary.main' }} />
                  Outcomes
                </Typography>
                <Typography sx={{ bgcolor: 'grey.100', p: 2, borderRadius: 1 }}>{lessonData.outcomes}</Typography>
              </Box>
              <Box>
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <EditIcon sx={{ color: 'primary.main' }} />
                  Suggested Actions
                </Typography>
                <Box component="ul" sx={{ bgcolor: 'grey.100', p: 2, borderRadius: 1, listStyle: 'none' }}>
                  {lessonData.suggestedActions.map((action, index) => (
                    <li key={index} style={{ position: 'relative', paddingLeft: '16px', marginBottom: '8px' }}>
                      <span style={{ position: 'absolute', left: 0, color: theme.palette.primary.main }}>•</span>
                      {action}
                    </li>
                  ))}
                </Box>
              </Box>
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>Tags</Typography>
                <Stack direction="row" spacing={1}>
                  {lessonData.tags.map((tag, index) => (
                    <Chip key={index} label={tag} variant="outlined" size="small" />
                  ))}
                </Stack>
              </Box>
            </TabPanel>

            <TabPanel value={tab} index={1}>
              <List sx={{ mb: 3 }}>
                {lessonData.comments.length ? (
                  lessonData.comments.map((comment, index) => (
                    <ListItem key={index} sx={{ bgcolor: 'grey.100', borderRadius: 1, mb: 1, p: 2 }}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'primary.main' }}>{comment.avatar}</Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="subtitle2">{comment.author}</Typography>
                            <Typography variant="caption" color="text.secondary">{comment.date}</Typography>
                          </Box>
                        }
                        secondary={<Typography variant="body2">{comment.text}</Typography>}
                      />
                    </ListItem>
                  ))
                ) : (
                  <Typography color="text.secondary" sx={{ p: 2 }}>No comments yet.</Typography>
                )}
              </List>
              <Box component="form" onSubmit={handleCommentSubmit}>
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <CommentIcon sx={{ color: 'primary.main' }} />
                  Add Comment
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write your comment here..."
                  sx={{ mb: 2, bgcolor: 'grey.100', borderRadius: 1 }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<CommentIcon />}
                  disabled={!comment.trim()}
                >
                  Post Comment
                </Button>
              </Box>
            </TabPanel>

            <TabPanel value={tab} index={2}>
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <HistoryIcon sx={{ color: 'primary.main' }} />
                History
              </Typography>
              <List>
                {lessonData.history.map((item, index) => (
                  <ListItem key={index} sx={{ bgcolor: 'grey.100', borderRadius: 1, mb: 1, p: 2 }}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'grey.200' }}>
                        <HistoryIcon color="action" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={<Typography variant="subtitle2">{item.action}</Typography>}
                      secondary={
                        <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                          <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <PersonIcon fontSize="small" />
                            {item.by}
                          </Typography>
                          <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <DateIcon fontSize="small" />
                            {item.date}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </TabPanel>
          </Paper>
        </Box>

        <Box sx={{ flex: '1 1 35%', maxWidth: { xs: '100%', lg: '35%' }, minWidth: 0 }}>
          <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2, boxShadow: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <PersonIcon sx={{ color: 'primary.main' }} />
              Submitted By
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: 'grey.100', p: 2, borderRadius: 1 }}>
              <Avatar sx={{ bgcolor: 'primary.main', mr: 2, width: 48, height: 48 }}>
                {lessonData.submittedBy.avatar}
              </Avatar>
              <Box>
                <Typography variant="subtitle1" fontWeight={600}>{lessonData.submittedBy.name}</Typography>
                <Typography variant="body2" color="text.secondary">{lessonData.submittedBy.role}</Typography>
              </Box>
            </Box>

            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 3, mb: 2 }}>
              <DateIcon sx={{ color: 'primary.main' }} />
              Details
            </Typography>
            <Box sx={{ bgcolor: 'grey.100', p: 2, borderRadius: 1 }}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" color="text.secondary" fontWeight={500}>Date Submitted</Typography>
                <Typography variant="body2" fontWeight={500}>{lessonData.dateCaptured}</Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" color="text.secondary" fontWeight={500}>Category</Typography>
                <Typography variant="body2" fontWeight={500}>{lessonData.category}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary" fontWeight={500}>Sub-Category</Typography>
                <Typography variant="body2" fontWeight={500}>{lessonData.subCategory}</Typography>
              </Box>
            </Box>

            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 3, mb: 2 }}>
              <DescriptionIcon sx={{ color: 'primary.main' }} />
              Documents
            </Typography>
            <List dense>
              {lessonData.relatedDocuments.map((doc, index) => (
                <ListItem
                  key={index}
                  sx={{ p: 1, bgcolor: 'grey.100', borderRadius: 1, mb: 1 }}
                  secondaryAction={<Button sx={{ minWidth: 0, p: 1 }}><ExportIcon fontSize="small" /></Button>}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: getDocumentColor(doc.type), borderRadius: 1, width: 36, height: 36 }}>
                      {getDocumentIcon(doc.type)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={<Typography variant="body2" fontWeight={600}>{doc.name}</Typography>}
                    secondary={<Typography variant="caption">{doc.size}</Typography>}
                  />
                </ListItem>
              ))}
            </List>
            <Button variant="contained" startIcon={<DescriptionIcon />} fullWidth sx={{ mt: 2 }}>
              Upload Document
            </Button>
          </Paper>

          <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2, boxShadow: 3 }}>
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <ShareIcon sx={{ color: 'primary.main' }} />
              Share & Export
            </Typography>
            <Stack spacing={1}>
              <Button variant="contained" startIcon={<ShareIcon />} fullWidth>Share Lesson</Button>
              <Button variant="outlined" startIcon={<ExportIcon />} fullWidth>Export as PDF</Button>
              <Button variant="outlined" startIcon={<ExportIcon />} fullWidth>Export as Word</Button>
            </Stack>
          </Paper>
        </Box>
      </Box>

      {isEditing && (
        <Box
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            p: 2,
            bgcolor: 'background.paper',
            boxShadow: 6,
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
          }}
        >
          <Button variant="contained" color="primary">Save Changes</Button>
          <Button variant="outlined" onClick={() => setIsEditing(false)}>Cancel</Button>
        </Box>
      )}
    </Box>
  );
};

export default LessonsPage;