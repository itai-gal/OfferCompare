import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <header
            style={{
                padding: "0.75rem 2rem",
                borderBottom: "1px solid #eee",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "#ffffff",
                position: "sticky",
                top: 0,
                zIndex: 10,
            }}
        >
            <Link to="/" style={{ textDecoration: "none", color: "#111" }}>
                <span style={{ fontWeight: 700, fontSize: "1.1rem" }}>
                    Compare<span style={{ color: "#3b82f6" }}>Offer</span>
                </span>
            </Link>

            <nav style={{ display: "flex", gap: "1rem" }}>
                <NavLink
                    to="/"
                    style={({ isActive }) => ({
                        textDecoration: "none",
                        color: isActive ? "#3b82f6" : "#333",
                        fontWeight: isActive ? 600 : 400,
                    })}
                >
                    Home
                </NavLink>
                <NavLink
                    to="/compare"
                    style={({ isActive }) => ({
                        textDecoration: "none",
                        color: isActive ? "#3b82f6" : "#333",
                        fontWeight: isActive ? 600 : 400,
                    })}
                >
                    Compare
                </NavLink>
                <NavLink
                    to="/about"
                    style={({ isActive }) => ({
                        textDecoration: "none",
                        color: isActive ? "#3b82f6" : "#333",
                        fontWeight: isActive ? 600 : 400,
                    })}
                >
                    About
                </NavLink>
            </nav>
        </header>
    );
};

export default Navbar;
