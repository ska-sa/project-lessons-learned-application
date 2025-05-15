import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  Chip,
} from "@mui/material";
import { format } from "date-fns";
import { Box } from "@mui/material";
const lessons = [
  {
    id: 1,
    title: "Importance of documentation",
    project: "MeerKAT",
    category: "Technical",
    date: new Date("2023-05-15"),
  },
  {
    id: 2,
    title: "Need for better communication",
    project: "AVN",
    category: "Communication",
    date: new Date("2023-05-10"),
  },
  {
    id: 3,
    title: "Resource allocation issues",
    project: "SKA",
    category: "Resource",
    date: new Date("2023-05-05"),
  },
];

const RecentLessonsList = () => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Recent Lessons
      </Typography>
      <List>
        {lessons.map((lesson, index) => (
          <div key={lesson.id}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={lesson.title}
                secondary={
                  <>
                    <Box component="span" sx={{ display: "block" }}>
                      Project: {lesson.project}
                    </Box>
                    <Box
                      component="span"
                      sx={{ display: "flex", alignItems: "center", mt: 1 }}
                    >
                      <Chip
                        label={lesson.category}
                        size="small"
                        sx={{ mr: 1 }}
                      />
                      {format(lesson.date, "MMM dd, yyyy")}
                    </Box>
                  </>
                }
              />
            </ListItem>
            {index < lessons.length - 1 && <Divider component="li" />}
          </div>
        ))}
      </List>
    </>
  );
};

export default RecentLessonsList;
