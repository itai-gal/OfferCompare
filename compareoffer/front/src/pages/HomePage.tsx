import { useNavigate } from "react-router-dom";

type DemoOffer = {
    company: string;
    title: string;
    salary: string;
    location: string;
    workMode: "onsite" | "remote" | "hybrid";
};

const demoOffers: DemoOffer[] = [
    {
        company: "CloudWorks",
        title: "Junior DevOps Engineer",
        salary: "₪19,000",
        location: "Tel Aviv",
        workMode: "hybrid",
    },
    {
        company: "FinTech Labs",
        title: "Backend Node.js Developer",
        salary: "₪21,500",
        location: "Ramat Gan",
        workMode: "onsite",
    },
    {
        company: "VisionX",
        title: "Frontend React Developer",
        salary: "₪18,500",
        location: "Remote (IL)",
        workMode: "remote",
    },
    {
        company: "DataSense",
        title: "Data Analyst",
        salary: "₪17,000",
        location: "Herzliya",
        workMode: "hybrid",
    },
];

function getWorkModeLabel(mode: DemoOffer["workMode"]) {
    if (mode === "remote") return "Remote";
    if (mode === "hybrid") return "Hybrid";
    return "On-site";
}

const HomePage = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate("/compare");
    };

    const handleAddOffer = () => {
        navigate("/offers/new");
    };

    return (
        <main
            style={{
                maxWidth: 1000,
                margin: "2rem auto",
                padding: "1rem",
            }}
        >
            {/* hero */}
            <section style={{ marginBottom: "2rem" }}>
                <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                    Compare your job offers with a clear head
                </h1>
                <p
                    style={{
                        fontSize: "1rem",
                        color: "#4b5563",
                        maxWidth: 600,
                        lineHeight: 1.5,
                    }}
                >
                    Keep all your offers in one place, see them side by side, and get a
                    simple view that helps you choose your next role with confidence.
                </p>

                <div style={{ marginTop: "1.2rem", display: "flex", gap: "0.75rem" }}>
                    <button
                        type="button"
                        onClick={handleGetStarted}
                        style={{
                            padding: "0.7rem 1.4rem",
                            borderRadius: 999,
                            border: "none",
                            backgroundColor: "#3b82f6",
                            color: "#ffffff",
                            fontWeight: 500,
                            cursor: "pointer",
                            fontSize: "0.95rem",
                        }}
                    >
                        Get started
                    </button>

                    <button
                        type="button"
                        onClick={handleAddOffer}
                        style={{
                            padding: "0.7rem 1.4rem",
                            borderRadius: 999,
                            border: "1px solid #d1d5db",
                            backgroundColor: "#ffffff",
                            color: "#111827",
                            cursor: "pointer",
                            fontSize: "0.9rem",
                        }}
                    >
                        Add an offer
                    </button>
                </div>
            </section>

            {/* demo section */}
            <section>
                <h2 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>
                    Example of how your offers might look
                </h2>
                <p
                    style={{
                        fontSize: "0.9rem",
                        color: "#6b7280",
                        marginBottom: "1rem",
                    }}
                >
                    These are sample offers. In the real app you will see your own offers
                    here, saved from your job search.
                </p>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
                        gap: "1rem",
                    }}
                >
                    {demoOffers.map((offer) => (
                        <article
                            key={`${offer.company}-${offer.title}`}
                            style={{
                                borderRadius: 10,
                                border: "1px solid #e5e7eb",
                                padding: "0.9rem 1rem",
                                backgroundColor: "#ffffff",
                                boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
                            }}
                        >
                            <header style={{ marginBottom: "0.4rem" }}>
                                <h3
                                    style={{
                                        fontSize: "0.95rem",
                                        fontWeight: 600,
                                        marginBottom: "0.1rem",
                                    }}
                                >
                                    {offer.company}
                                </h3>
                                <p
                                    style={{
                                        fontSize: "0.85rem",
                                        color: "#4b5563",
                                    }}
                                >
                                    {offer.title}
                                </p>
                            </header>

                            <dl
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "auto 1fr",
                                    rowGap: "0.25rem",
                                    columnGap: "0.5rem",
                                    fontSize: "0.8rem",
                                    color: "#4b5563",
                                }}
                            >
                                <dt>Salary</dt>
                                <dd style={{ margin: 0 }}>{offer.salary}</dd>

                                <dt>Location</dt>
                                <dd style={{ margin: 0 }}>{offer.location}</dd>

                                <dt>Work mode</dt>
                                <dd style={{ margin: 0 }}>{getWorkModeLabel(offer.workMode)}</dd>
                            </dl>
                        </article>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default HomePage;
