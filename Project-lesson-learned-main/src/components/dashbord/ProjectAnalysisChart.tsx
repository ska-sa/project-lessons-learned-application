// src/components/dashboard/ProjectAnalysisChart.tsx
import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import { Paper,Box, Typography } from "@mui/material";
import { useAppSelector } from "../../hooks/hooks";
import { selectAllProjects } from "./projectsSlice";

const COLORS = {
  active: "#2e7d32",
  completed: "#1976d2",
  "on-hold": "#ed6c02",
};

const ProjectAnalysisChart = () => {
  const projects = useAppSelector(selectAllProjects);
  const [chartData, setChartData] = React.useState<
    Array<{ name: string; value: number }>
  >([]);

  React.useEffect(() => {
    if (projects && projects.length > 0) {
      const statusCounts = projects.reduce(
        (acc, project) => {
          acc[project.status] = (acc[project.status] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      );

      const formattedData = Object.entries(statusCounts).map(([status, count]) => ({
        name: status.charAt(0).toUpperCase() + status.slice(1),
        value: count,
      }));

      setChartData(formattedData);
    }
  }, [projects]);

  return (
    <Paper
      sx={{
        p: 2,
        height: "100%",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{ textAlign: "center", fontWeight: 600 }}
      >
        Project Status Distribution
      </Typography>
      {chartData.length === 0 ? (
        <Box
          sx={{
            height: 300,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography color="text.secondary">
            No project data available
          </Typography>
        </Box>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={3}
              dataKey="value"
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
              labelLine={false}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[entry.name.toLowerCase() as keyof typeof COLORS] || "#999"}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </Paper>
  );
};

export default ProjectAnalysisChart;
