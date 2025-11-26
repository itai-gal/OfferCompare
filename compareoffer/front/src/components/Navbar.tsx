import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth();

    const firstName =
        user?.name && user.name.trim().length > 0
            ? user.name.trim().split(" ")[0]
            : "";

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

            <nav
                style={{
                    display: "flex",
                    gap: "1rem",
                    alignItems: "center",
                }}
            >
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

                {!isAuthenticated && (
                    <>
                        <NavLink
                            to="/login"
                            style={({ isActive }) => ({
                                textDecoration: "none",
                                color: isActive ? "#3b82f6" : "#333",
                                fontWeight: isActive ? 600 : 400,
                            })}
                        >
                            Login
                        </NavLink>
                        <NavLink
                            to="/register"
                            style={({ isActive }) => ({
                                textDecoration: "none",
                                color: isActive ? "#3b82f6" : "#333",
                                fontWeight: isActive ? 600 : 400,
                            })}
                        >
                            Register
                        </NavLink>
                    </>
                )}

                {isAuthenticated && (
                    <div
                        style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}
                    >
                        <span style={{ fontSize: "0.9rem", color: "#555" }}>
                            Hi{firstName ? `, ${firstName}` : ""} 👋
                        </span>
                        <button
                            type="button"
                            onClick={logout}
                            style={{
                                padding: "0.25rem 0.75rem",
                                fontSize: "0.85rem",
                                cursor: "pointer",
                            }}
                        >
                            Logout
                        </button>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Navbar;