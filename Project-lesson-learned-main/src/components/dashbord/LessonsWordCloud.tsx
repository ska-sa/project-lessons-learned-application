import React from 'react';
import { Box, Typography, BoxProps } from '@mui/material';
import useWordCloud from './useWordCloud';

// Define types
interface WordType {
  text: string;
  value: number;
}

interface Lesson {
  id: string;
  title: string;
  description: string;
  category: string;
  // Add other required fields based on your data
}

interface LessonsWordCloudProps extends BoxProps {
  lessons: Lesson[];
}

const LessonsWordCloud: React.FC<LessonsWordCloudProps> = ({ lessons }) => {
  // Process lessons into word cloud data using the custom hook
  const { words } = useWordCloud(lessons);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Common Themes
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          justifyContent: 'center',
          p: 2,
        }}
      >
        {words.map((word, index) => (
          <Typography
            key={word.text}
            sx={{
              fontSize: `${word.value / 2 + 12}px`,
              fontWeight: 'bold',
              color: index % 2 === 0 ? 'primary.main' : 'secondary.main',
              opacity: 0.8,
              '&:hover': {
                opacity: 1,
                transform: 'scale(1.1)',
              },
              transition: 'all 0.3s ease',
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
