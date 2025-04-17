// src/components/dashboard/IssuesTrendChart.tsx
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Typography } from "@mui/material";

const data = [
  { name: "Jan", Critical: 4, High: 3, Medium: 2, Low: 1 },
  { name: "Feb", Critical: 3, High: 4, Medium: 1, Low: 2 },
  { name: "Mar", Critical: 2, High: 3, Medium: 4, Low: 1 },
  { name: "Apr", Critical: 3, High: 2, Medium: 1, Low: 4 },
  { name: "May", Critical: 4, High: 1, Medium: 2, Low: 3 },
  { name: "Jun", Critical: 1, High: 4, Medium: 3, Low: 2 },
];

const IssuesTrendChart = () => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Project Issues Trend
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="Critical"
            stroke="#ff1744"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="High" stroke="#ff9100" />
          <Line type="monotone" dataKey="Medium" stroke="#2979ff" />
          <Line type="monotone" dataKey="Low" stroke="#00c853" />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default IssuesTrendChart;
