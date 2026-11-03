import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { StoreProvider } from "./store";
import { AuthProvider } from "./AuthContext";
import { LanguageProvider } from "./LanguageContext";
import App from "./App";
import "./styles.css";
import "react-toastify/dist/ReactToastify.css";
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <AuthProvider>
          <StoreProvider>
            <App />
          </StoreProvider>
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
