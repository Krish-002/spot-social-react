import { Link, useLocation } from "react-router-dom";
import "./index.css";
import { FaUserAlt, FaStream, FaPlus } from "react-icons/fa";

function SpotNavigation() {
  const links = [
    { label: "Profile",   icon: <FaUserAlt className="fs-2 purple-icon" />  },
    { label: "Feed", icon: <FaStream className="fs-2" />  },
    { label: "Post",   icon: <FaPlus className="fs-2" />           },
  ];
  const { pathname } = useLocation();
  return (
    
    <ul className="nav p-2 justify-content-between kb-navbar-conatiner">
      {links.map((link, index) => (
        <li key={index} className={`kb-navbar-items nav-item ${pathname.includes(link.label) ? "kb-active" : ""}`}>
          <Link to={`/Spot/${link.label}`} className="nav-link"> {link.icon} {link.label} </Link>
        </li>
      ))}
    </ul>
  );
}
export default SpotNavigation;