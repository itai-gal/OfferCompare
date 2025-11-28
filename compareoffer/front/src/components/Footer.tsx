const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-inner">
                <span>© {currentYear} CompareOffer. All rights reserved.</span>

                <span>
                    Built by{" "}
                    <a
                        href="https://www.linkedin.com/in/itai-gal-894415361/"
                        target="_blank"
                        rel="noreferrer"
                        className="footer-link"
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