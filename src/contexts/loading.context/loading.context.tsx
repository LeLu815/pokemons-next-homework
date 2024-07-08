"use client";

import { CircularProgress } from "@mui/material";
import { createContext, PropsWithChildren, useContext, useState } from "react";

type LoadingContextValue = {
  openLoading: () => void;
  closeLoading: () => void;
};

const initialValue: LoadingContextValue = {
  openLoading: () => {},
  closeLoading: () => {},
};

const LoadingContext = createContext<LoadingContextValue>(initialValue);

export const useLoading = () => useContext(LoadingContext);

export function LoadingProvider({ children }: PropsWithChildren) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const openLoading = () => setIsLoading(true);
  const closeLoading = () => setIsLoading(false);

  const value: LoadingContextValue = {
    openLoading,
    closeLoading,
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
      {isLoading && (
        <div className="fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center backdrop-brightness-[0.35]">
          <CircularProgress />
        </div>
      )}
    </LoadingContext.Provider>
  );
}
