import React, { createContext, useContext, useState, useCallback } from "react";

const SnackbarContext = createContext();

export const useSnackbar = () => useContext(SnackbarContext);

export const SnackbarProvider = ({ children }) => {
    const [message, setMessage] = useState("");
    const [visible, setVisible] = useState(false);

    const showSnackbar = useCallback((msg, duration = 3000) => {
        setMessage(msg);
        setVisible(true);
        setTimeout(() => {
            setVisible(false);
        }, duration);
    }, []);

    return (
        <SnackbarContext.Provider value={{ showSnackbar }}>
            {children}
            {visible && (
                <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-black text-white text-sm px-4 py-2 rounded-lg shadow-lg z-50">
                    {message}
                </div>
            )}
        </SnackbarContext.Provider>
    );
};
