// src/components/dashboard/useWordCloud.ts
import { useState, useEffect } from "react";

interface WordType {
  text: string;
  value: number;
}

interface Dimensions {
  width: number;
  height: number;
}

export const useWordCloud = (words: WordType[]) => {
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", updateDimensions);
    updateDimensions();

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return {
    dimensions,
    words: words.sort(() => Math.random() - 0.5),
  };
};
