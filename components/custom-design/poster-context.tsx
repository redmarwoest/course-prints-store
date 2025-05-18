"use client";
import { createContext, ReactNode, useContext, useState } from "react";
import { FormData } from "../../app/types/types";

interface PosterContextType {
  savedPosters: FormData[];
  addPoster: (poster: FormData) => void;
  removePoster: (index: number) => void;
  clearPosters: () => void;
  updatePoster: (index: number, poster: FormData) => void;
}

const PosterContext = createContext<PosterContextType | undefined>(undefined);

export function PosterProvider({ children }: { children: ReactNode }) {
  const [savedPosters, setSavedPosters] = useState<FormData[]>([]);

  const addPoster = (poster: FormData) => {
    setSavedPosters((prev) => [...prev, poster]);
  };

  const removePoster = (index: number) => {
    setSavedPosters((prev) => prev.filter((_, i) => i !== index));
  };

  const updatePoster = (index: number, updatedPoster: FormData) => {
    setSavedPosters((prev) => {
      const newPosters = [...prev];
      newPosters[index] = updatedPoster;
      return newPosters;
    });
  };

  const clearPosters = () => {
    setSavedPosters([]);
  };
  return (
    <PosterContext.Provider
      value={{
        savedPosters,
        addPoster,
        removePoster,
        clearPosters,
        updatePoster,
      }}
    >
      {children}
    </PosterContext.Provider>
  );
}

// Custom hook to use the poster context
export function usePosterContext() {
  const context = useContext(PosterContext);
  if (context === undefined) {
    throw new Error("usePosterContext must be used within a PosterProvider");
  }
  return context;
}
