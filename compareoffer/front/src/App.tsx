import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ComparePage from "./pages/ComparePage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import OffersListPage from "./pages/OffersListPage";
import AddOfferPage from "./pages/AddOfferPage";
import EditOfferPage from "./pages/EditOfferPage";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="app">
      <Navbar />

      <main style={{ padding: "1rem 2rem" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/offers" element={<OffersListPage />} />
          <Route path="/offers/new" element={<AddOfferPage />} />
          <Route path="/offers/:id/edit" element={<EditOfferPage />} />
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;