import React, { useEffect, useState } from "react";
import { Box, Grid, Card, Typography, CardContent, CircularProgress } from "@mui/material"; // Using Grid2
import api from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import { setLessons } from "../features/lessons/lessonsSlice";
import { RootState } from "../store/store";
import LessonsWordCloud from "../components/dashbord/LessonsWordCloud";
import ProjectAnalysisChart from "../components/dashbord/ProjectAnalysisChart";


interface DashboardStats {
  totalProjects: number;
  activeProjects: number;
  lessonsRecorded: number;
  trendingCategories: string[];
}

interface Lesson {
  id: string;
  title: string;
  description: string;
  project: string;
  category: string;
  impact: "positive" | "negative" | "neutral";
  createdAt: string;
  isConfidential?: boolean; // ✅ Ensure this is defined
}

const DashboardPage = () => {
  const dispatch = useDispatch();
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get lessons from Redux store
  const lessons = useSelector((state: RootState) => state.lessons.lessons as Lesson[]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [lessonsRes, statsRes] = await Promise.all([
          api.get("/lessons"),
          api.get("/reports/summary"),
        ]);

        dispatch(setLessons(lessonsRes.data));
        setDashboardStats(statsRes.data);
      } catch (err) {
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}> {/* ✅ Use `size` instead of `item + xs` */}
          <Card>
            <CardContent>
              <Typography variant="h4">
                {dashboardStats?.totalProjects || 0}
              </Typography>
              <Typography>Total Projects</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Word Cloud */}
      <LessonsWordCloud lessons={lessons} />

      {/* Project Analysis Chart */}
      <ProjectAnalysisChart />

      {/* Recent Lessons List */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Recent Lessons
        </Typography>
        <Grid container spacing={2}>
          {lessons.slice(0, 5).map((lesson) => (
            <Grid key={lesson.id} size={{ xs: 12, md: 6 }}> {/* ✅ Use `size` instead of `item + xs/md` */}
              <Card>
                <CardContent>
                  <Typography variant="h6">{lesson.title}</Typography>
                  <Typography color="text.secondary">
                    {lesson.project} - {lesson.category}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default DashboardPage;
