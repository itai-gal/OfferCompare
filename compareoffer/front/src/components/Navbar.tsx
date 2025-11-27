import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth();

    // Try to get a name:
    const displayName =
        (user?.firstName && user.firstName.trim()) ||
        (user?.name && user.name.trim().split(" ")[0]) ||
        null;

    return (
        <header className="navbar">
            <div className="navbar-inner">
                <Link to="/" className="navbar-brand">
                    Compare<span className="navbar-brand-highlight">Offer</span>
                </Link>

                <nav className="navbar-links">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? "navbar-link navbar-link-active" : "navbar-link"
                        }
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/compare"
                        className={({ isActive }) =>
                            isActive ? "navbar-link navbar-link-active" : "navbar-link"
                        }
                    >
                        Compare
                    </NavLink>

                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            isActive ? "navbar-link navbar-link-active" : "navbar-link"
                        }
                    >
                        About
                    </NavLink>

                    {/* ======= CASE 1: NOT AUTHENTICATED ======= */}
                    {!isAuthenticated && (
                        <>
                            <NavLink
                                to="/login"
                                className={({ isActive }) =>
                                    isActive ? "navbar-link navbar-link-active" : "navbar-link"
                                }
                            >
                                Login
                            </NavLink>

                            <NavLink
                                to="/register"
                                className={({ isActive }) =>
                                    isActive ? "navbar-link navbar-link-active" : "navbar-link"
                                }
                            >
                                Register
                            </NavLink>
                        </>
                    )}

                    {/* ======= CASE 2 + 3: AUTHENTICATED ======= */}
                    {isAuthenticated && (
                        <div className="navbar-user">
                            {/* Show Hi only if we actually have a name */}
                            {displayName && (
                                <span>
                                    Hi, {displayName}
                                </span>
                            )}

                            <button
                                type="button"
                                onClick={logout}
                                className="navbar-logout-btn"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
