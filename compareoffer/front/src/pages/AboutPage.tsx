const AboutPage = () => {
    return (
        <main
            style={{
                maxWidth: 900,
                margin: "2rem auto",
                padding: "1rem",
                lineHeight: 1.6,
            }}
        >
            <h1
                style={{
                    fontSize: "2rem",
                    marginBottom: "1rem",
                    fontWeight: 600,
                }}
            >
                About CompareOffer
            </h1>

            <section style={{ marginBottom: "2rem" }}>
                <p style={{ fontSize: "1rem", color: "#4b5563", marginBottom: "1rem" }}>
                    CompareOffer was built to solve one of the most stressful moments in any job search:
                    <strong> choosing between multiple job offers.</strong>
                    When each offer includes different salaries, locations, benefits and work conditions - it’s easy to get overwhelmed.
                </p>

                <p style={{ fontSize: "1rem", color: "#4b5563", marginBottom: "1rem" }}>
                    This app helps you keep everything clear, organized and centered in one place.
                    Save your offers, view them side-by-side, and instantly identify which option truly fits your goals, lifestyle and priorities.
                </p>

                <p style={{ fontSize: "1rem", color: "#4b5563" }}>
                    Our goal is simple:
                    <strong>Make your decision easier, smarter, and more confident - without spreadsheets, confusion or stress.</strong>
                </p>
            </section>

            <section style={{ marginBottom: "2rem" }}>
                <h2
                    style={{
                        fontSize: "1.4rem",
                        marginBottom: "0.7rem",
                        fontWeight: 600,
                    }}
                >
                    Why use CompareOffer?
                </h2>

                <ul style={{ color: "#4b5563", fontSize: "1rem", paddingLeft: "1.2rem" }}>
                    <li style={{ marginBottom: "0.6rem" }}>
                        ✓ Organize all your job offers in one secure place
                    </li>
                    <li style={{ marginBottom: "0.6rem" }}>
                        ✓ Compare them side-by-side with a clean, visual layout
                    </li>
                    <li style={{ marginBottom: "0.6rem" }}>
                        ✓ Evaluate salary, location, work mode, and other key factors
                    </li>
                    <li style={{ marginBottom: "0.6rem" }}>
                        ✓ Get a recommended “best fit” offer using a smart scoring system
                    </li>
                    <li style={{ marginBottom: "0.6rem" }}>
                        ✓ Make a confident and well-informed career decision
                    </li>
                </ul>
            </section>

            <section style={{ marginBottom: "3rem" }}>
                <h2
                    style={{
                        fontSize: "1.4rem",
                        marginBottom: "0.7rem",
                        fontWeight: 600,
                    }}
                >
                    Who is this app for?
                </h2>

                <p style={{ fontSize: "1rem", color: "#4b5563" }}>
                    Anyone comparing two or more opportunities - developers, designers, analysts,
                    managers, students entering the industry, and even senior professionals.
                </p>
            </section>

            {/* footer credit */}
            <footer
                style={{
                    marginTop: "3rem",
                    paddingTop: "1.5rem",
                    borderTop: "1px solid #e5e7eb",
                    textAlign: "center",
                }}
            >
                <p style={{ marginBottom: "0.25rem", color: "#374151" }}>
                    Designed to help you make smarter career decisions
                </p>
                <p style={{ fontWeight: 600, color: "#111827" }}>by Itai Gal</p>
            </footer>
        </main>
    );
};

export default AboutPage;
