import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

export const NavBar = () => {
    const navigate = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem("game_user"));

    return (
        <ul className="navbar">
            <li className="navbar-item">
                <Link className="navbar-link" to="/home">Home</Link>
            </li>
            <li className="navbar-item">
                <Link className="navbar-link" to="/myarmies">My Armies</Link>
            </li>
            <li className="navbar-item">
                <Link className="navbar-link" to="/createarmy">Create Army</Link>
            </li>
            {currentUser && currentUser.isDev && (
                <li className="navbar-item">
                    <Link className="navbar-link" to="/devmode">Dev Mode</Link>
                </li>
            )}
            {currentUser && (
                <li className="navbar-item navbar-logout">
                    <button
                        className="navbar-link"
                        onClick={() => {
                            localStorage.removeItem("game_user");
                            navigate("/login", { replace: true });
                        }}
                    >
                        Logout
                    </button>
                </li>
            )}
        </ul>
    );
};
