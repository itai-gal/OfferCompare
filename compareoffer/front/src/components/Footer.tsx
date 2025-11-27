const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer
            style={{
                borderTop: "1px solid var(--color-border)",
                marginTop: "3rem",
                padding: "1rem 0",
                background: "#f9fafb",
            }}
        >
            <div
                style={{
                    maxWidth: 1000,
                    margin: "0 auto",
                    padding: "0 1.5rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "1rem",
                    fontSize: "0.85rem",
                    color: "#6b7280",
                    flexWrap: "wrap",
                }}
            >
                <span>
                    © {currentYear} CompareOffer. All rights reserved.
                </span>

                <span>
                    Built by{" "}
                    <a
                        href="https://www.linkedin.com/in/itai-gal-894415361/"
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: "#2563eb", textDecoration: "underline" }}
                    >
                        Itai Gal
                    </a>
                    .
                </span>
            </div>
        </footer>
    );
};

export default Footer;
