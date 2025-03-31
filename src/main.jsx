import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SnackbarProvider } from "./contexts/SnackbarProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <SnackbarProvider>
            <App />
        </SnackbarProvider>
    </React.StrictMode>
);
