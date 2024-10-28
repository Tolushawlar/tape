"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// Define the type for our context value
interface GlobalContextType {
  globalState: boolean;
  setGlobalState: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 ** Define the proper type for our context

// interface GlobalContextType {
//   globalState: {
//     isAuthenticated: boolean;
//     theme: "light" | "dark";
//     userPreferences: {
//       notifications: boolean;
//       language: string;
//     };
//   };
//   setGlobalState: React.Dispatch<
//     React.SetStateAction<{
//       isAuthenticated: boolean;
//       theme: "light" | "dark";
//       userPreferences: {
//         notifications: boolean;
//         language: string;
//       };
//     }>
//   >;
// }

*/

// Create the GlobalState context with type
const GlobalStateContext = createContext<GlobalContextType | undefined>(
  undefined
);

// Props interface for GlobalStateProvider
interface GlobalStateProviderProps {
  children: ReactNode;
}

// Custom hook to access the GlobalStateContext
export const useGlobalState = (): GlobalContextType => {
  const context = useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};

// GlobalStateProvider component
export const GlobalStateProvider = ({ children }: GlobalStateProviderProps) => {
  const [globalState, setGlobalState] = useState<boolean>(false); // Example state

  return (
    <GlobalStateContext.Provider value={{ globalState, setGlobalState }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

// Export the context type if needed elsewhere
export type { GlobalContextType };
