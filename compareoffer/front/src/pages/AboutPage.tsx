const AboutPage = () => {
    return (
        <main className="page about-page">
            <section className="about-section">
                <h1 className="page-title">About CompareOffer</h1>

                <p className="about-text">
                    CompareOffer was built to solve one of the most stressful moments in any job search:
                    <strong> choosing between multiple job offers.</strong> When each offer includes different
                    salaries, locations, benefits and work conditions – it’s easy to get overwhelmed.
                </p>

                <p className="about-text">
                    This app helps you keep everything clear, organized and centered in one place.
                    Save your offers, view them side-by-side, and instantly identify which option truly fits
                    your goals, lifestyle and priorities.
                </p>

                <p className="about-text">
                    Our goal is simple: Make your decision{" "}
                    <strong>easier, smarter, and more confident – without spreadsheets, confusion or stress.</strong>
                </p>
            </section>

            <section className="about-section">
                <h2 className="about-heading">Why use CompareOffer?</h2>

                <ul className="about-list">
                    <li>✓ Organize all your job offers in one secure place</li>
                    <li>✓ Compare them side-by-side with a clean, visual layout</li>
                    <li>✓ Evaluate salary, location, work mode, and other key factors</li>
                    <li>✓ Get a recommended “best fit” offer using a smart scoring system</li>
                    <li>✓ Make a confident and well-informed career decision</li>
                </ul>
            </section>

            <section className="about-section">
                <h2 className="about-heading">Who is this app for?</h2>

                <p className="about-text">
                    Anyone comparing two or more opportunities – developers, designers, analysts,
                    managers, students entering the industry, and even senior professionals.
                </p>
            </section>

            <footer className="about-footer">
                <p className="about-footer-text">
                    Designed to help you make smarter career decisions
                </p>
            </footer>
        </main>
    );
};

export default AboutPage;