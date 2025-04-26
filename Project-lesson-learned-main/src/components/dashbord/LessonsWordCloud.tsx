import { Box, Typography } from "@mui/material";
import { useWordCloud } from "./useWordCloud";

const words = [
  { text: "Documentation", value: 38 },
  { text: "Testing", value: 30 },
  { text: "Communication", value: 28 },
  { text: "Deadlines", value: 25 },
  { text: "Resources", value: 22 },
  { text: "Planning", value: 18 },
  { text: "Review", value: 16 },
  { text: "Deployment", value: 14 },
  { text: "Meetings", value: 12 },
  { text: "Feedback", value: 10 },
];

const LessonsWordCloud = () => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Common Themes
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "center",
          p: 2,
        }}
      >
        {words.map((word, index) => (
          <Typography
            key={index}
            sx={{
              fontSize: `${word.value / 2 + 12}px`,
              fontWeight: "bold",
              color: index % 2 === 0 ? "primary.main" : "secondary.main",
              opacity: 0.8,
              "&:hover": {
                opacity: 1,
                transform: "scale(1.1)",
              },
              transition: "all 0.3s ease",
            }}
          >
            {word.text}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

export default LessonsWordCloud;
