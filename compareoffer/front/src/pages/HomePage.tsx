import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type DemoOffer = {
    company: string;
    title: string;
    salary: string;
    location: string;
    workMode: "onsite" | "remote" | "hybrid";
};

const demoOffers: DemoOffer[] = [
    {
        company: "AppNest",
        title: "Junior Mobile Developer",
        salary: "₪10,000",
        location: "Herzliya",
        workMode: "hybrid",
    },
    {
        company: "CloudWorks",
        title: "Junior DevOps Engineer",
        salary: "₪11,000",
        location: "Tel Aviv",
        workMode: "hybrid",
    },
    {
        company: "DataSense",
        title: "Data Analyst intern",
        salary: "₪10,000",
        location: "Herzliya",
        workMode: "hybrid",
    },
    {
        company: "StreamFlow",
        title: "Junior Data Engineer",
        salary: "₪11,000",
        location: "Tel Aviv",
        workMode: "hybrid",
    },
    {
        company: "RoboTest",
        title: "QA Automation Developer (Entry Level)",
        salary: "₪10,000",
        location: "Tel Aviv",
        workMode: "hybrid",
    },
    {
        company: "NetHelp",
        title: "IT Support Specialist (Tier 1)",
        salary: "₪8,000",
        location: "Holon",
        workMode: "onsite",
    },
];


function getWorkModeLabel(mode: DemoOffer["workMode"]) {
    if (mode === "remote") return "Remote";
    if (mode === "hybrid") return "Hybrid";
    return "On-site";
}

const HomePage = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [showAuthPrompt, setShowAuthPrompt] = useState(false);

    const handleGetStarted = () => {
        if (isAuthenticated) {
            navigate("/compare");
        } else {
            setShowAuthPrompt(true);
        }
    };

    const handleAddOffer = () => {
        if (isAuthenticated) {
            navigate("/offers/new");
        } else {
            // if not authenticated, show the auth prompt
            setShowAuthPrompt(true);
        }
    };

    const goToLogin = () => navigate("/login");
    const goToRegister = () => navigate("/register");

    return (
        <main className="container">
            {/* hero */}
            <section className="hero">
                <h1 className="hero-title">Compare your job offers with a clear head</h1>

                <p
                    className="hero-subtitle"
                    style={{ marginTop: "0.75rem", marginBottom: "0.25rem" }}
                >
                    Keep all your offers in one place, see them side by side, and get a
                    simple view that helps you choose your next role with confidence.
                </p>

                <div className="hero-buttons">
                    <button type="button" className="btn btn-primary" onClick={handleGetStarted}>
                        Let&apos;s compare
                    </button>

                    <button type="button" className="btn btn-secondary" onClick={handleAddOffer}>
                        Add an offer
                    </button>
                </div>

                {/* auth prompt – when not authenticated click "Let's compare" or "Add an offer" */}
                {!isAuthenticated && showAuthPrompt && (
                    <div className="card auth-prompt" style={{ marginTop: "1rem" }}>
                        <p style={{ marginBottom: "0.75rem", fontSize: "0.9rem" }}>
                            To start comparing, create a free account or log in to your
                            existing one.
                        </p>
                        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                            <button type="button" className="btn btn-primary" onClick={goToRegister}>
                                Create account
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={goToLogin}>
                                I already have an account
                            </button>
                        </div>
                    </div>
                )}
            </section>

            {/* demo section */}
            <section>
                <h2 className="offers-section-title">Example of how your offers might look</h2>
                <p className="offers-section-subtitle">
                    These are sample offers. In the real app you will see your own offers
                    here, saved from your job search.
                </p>

                <div className="offers-grid">
                    {demoOffers.map((offer) => (
                        <article
                            key={`${offer.company}-${offer.title}`}
                            className="card"
                            style={{ padding: "0.9rem 1rem" }}
                        >
                            <header className="offer-card-header">
                                <h3 className="offer-card-title">{offer.company}</h3>
                                <p className="offer-card-subtitle">{offer.title}</p>
                            </header>

                            <dl className="offer-card-details">
                                <dt>Salary</dt>
                                <dd>{offer.salary}</dd>

                                <dt>Location</dt>
                                <dd>{offer.location}</dd>

                                <dt>Work mode</dt>
                                <dd>{getWorkModeLabel(offer.workMode)}</dd>
                            </dl>
                        </article>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default HomePage;
