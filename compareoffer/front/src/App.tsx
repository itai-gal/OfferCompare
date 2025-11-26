import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ComparePage from "./pages/ComparePage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import OffersListPage from "./pages/OffersListPage";
import AddOfferPage from "./pages/AddOfferPage";
import EditOfferPage from "./pages/EditOfferPage";

function App() {
  const [apiStatus, setApiStatus] = useState<string>("checking...");

  useEffect(() => {
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
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<div>Page not found</div>} />
          <Route path="/offers" element={<OffersListPage />} />
          <Route path="/offers/new" element={<AddOfferPage />} />
          <Route path="/offers/:id/edit" element={<EditOfferPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
