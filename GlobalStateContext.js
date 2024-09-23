"use client"
import React, { createContext, useContext, useState } from 'react';

// Create the GlobalState context
const GlobalStateContext = createContext();

// Custom hook to access the GlobalStateContext
export const useGlobalState = () => {
    return useContext(GlobalStateContext);
};

// GlobalStateProvider component
export const GlobalStateProvider = ({ children }) => {
    const [globalState, setGlobalState] = useState(false); // Example state

    return (
        <GlobalStateContext.Provider value={{ globalState, setGlobalState }}>
            {children}
        </GlobalStateContext.Provider>
    );
};
