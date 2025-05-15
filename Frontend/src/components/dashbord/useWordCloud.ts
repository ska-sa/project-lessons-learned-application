import { useState, useEffect } from 'react';
import { WordType } from '../LessonsWordCloud';

interface UseWordCloud {
  words: WordType[];
  dimensions: {
    width: number;
    height: number;
  };
}

const useWordCloud = (lessons: any[]): UseWordCloud => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Process lessons into word cloud data
  const words = lessons.reduce((acc: WordType[], lesson: any) => {
    // Extract words from lesson data - customize based on your data structure
    const textToAnalyze = `${lesson.title} ${lesson.description} ${lesson.category}`;
    const words = textToAnalyze.toLowerCase().split(/\s+/);
    
    words.forEach(word => {
      if (word.length > 3 && !isStopWord(word)) {
        const existing = acc.find(w => w.text === word);
        if (existing) {
          existing.value += 1;
        } else {
          acc.push({ text: word, value: 1 });
        }
      }
    });
    
    return acc;
  }, []);

  // Sort by frequency
  const sortedWords = [...words].sort((a, b) => b.value - a.value);

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return {
    words: sortedWords,
    dimensions,
  };
};

// Add common stop words to filter out
const isStopWord = (word: string): boolean => {
  const stopWords = [
    'the', 'and', 'of', 'to', 'in', 'a', 'for', 'on', 'with', 'as', 'by', 'an', 
    'be', 'that', 'it', 'at', 'was', 'is', 'are', 'or', 'from', 'this', 'these', 
    'those', 'but', 'not', 'are', 'they', 'we', 'he', 'she', 'his', 'her', 'their', 
    'our', 'my', 'you', 'your', 'i', 'me', 'him', 'us', 'them', 'what', 'which', 
    'who', 'whom', 'whose', 'where', 'when', 'why', 'how', 'all', 'any', 'both', 
    'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 
    'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 
    'just', 'don', 'should', 'now'
  ];
  
  return stopWords.includes(word.toLowerCase());
};

export default useWordCloud;
