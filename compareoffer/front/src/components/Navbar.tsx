import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth();

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

                    {isAuthenticated && (
                        <div className="navbar-user">
                            <span>
                                Hi,{" "}
                                {user?.firstName && user?.lastName
                                    ? `${user.firstName} ${user.lastName}`
                                    : user?.firstName || "there"}
                            </span>
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
