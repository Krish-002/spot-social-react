import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from '../Reducers/authSlice'; // Adjust the import path to where your authSlice is defined
import { FaUserAlt, FaStream, FaPlus, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import "./index.css";
import { RootState } from "../Store";

function SpotNavigation() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const links = [
    { label: "Profile", icon: <FaUserAlt className="fs-2 purple-icon" /> },
    { label: "Feed", icon: <FaStream className="fs-2" /> },
    { label: "Post", icon: <FaPlus className="fs-2" /> },
    { label: user ? "Logout" : "Signin", icon: user ? <FaSignOutAlt className="fs-2" /> : <FaSignInAlt className="fs-2" /> }
  ];

  const handleLogout = () => {
    dispatch(logoutUser());
    // Optional: Redirect to the login page or another page after logout
    window.location.href = '/Spot/Signin'; // Adjust as necessary for your routing
  };

  return (
    <div>
      <div className="img-container">
        <img src="https://storage.cloud.google.com/spot_social_posts/spotlogo.png" alt="Spot Logo"></img>
      </div>
      <ul className="nav p-2 justify-content-between kb-navbar-container">
        {links.map((link, index) => (
          <li key={index} className={`kb-navbar-items nav-item ${pathname.includes(link.label) ? "kb-active" : ""}`}>
            <Link to={`/Spot/${link.label}`} className="nav-link" onClick={link.label === "Logout" ? handleLogout : undefined}>
              {link.icon} {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SpotNavigation;
