import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ComparePage from "./pages/ComparePage";
import AboutPage from "./pages/AboutPage";

function App() {
  const [apiStatus, setApiStatus] = useState<string>("checking...");

  useEffect(() => {
    // check okay status of backend API
    fetch("http://localhost:5000/api/health")
      .then((res) => res.json())
      .then((data) => {
        setApiStatus(`API: ${data.status} (${data.service})`);
      })
      .catch(() => {
        setApiStatus("API: unreachable");
      });
  }, []);

  return (
    <div className="app">
      <Navbar />
      <main style={{ padding: "1rem 2rem" }}>
        <p style={{ fontSize: "0.85rem", color: "#666" }}>{apiStatus}</p>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
