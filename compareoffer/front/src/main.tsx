import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import "./styles/global-base.css";
import "./styles/global-components.css";
import { ToastProvider } from "./context/ToastContext";
import "./styles/navbar.css";
import "./styles/home.css";
import "./styles/toast.css";
import "./styles/compare-layout.css";
import "./styles/compare-table.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  </React.StrictMode>
);
