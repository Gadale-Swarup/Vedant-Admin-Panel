import { FaBell } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import "./Header.scss"; // Importing SCSS file
import logo from "../../assets/logo/Logo.png";

const Header = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    // Determine current user type before clearing
    const isCreator = localStorage.getItem("creator_token");
    // Navigate based on user type
    if (isCreator) {
      navigate("/creator/login");
    } else {
      navigate("/");
    }

    // Clear all possible stored data
    localStorage.removeItem("user");
    localStorage.removeItem("creator_token");
    localStorage.removeItem("token");
  };

  return (
    <header className="header">
      <div className="logo-sections">
        <img src={logo} alt="Simora.ai" className="logo" />
      </div>
      <div className="user-section">
        {/* <LanguageSwitcher /> */}
        <span className="user-name">{user?.name?.toUpperCase()}</span>
        <span className="user-role">{user?.role}</span>
        <IoMdLogOut
          onClick={handleLogout}
          className="icon-user"
          data-tooltip-id="logout-tooltip"
          data-tooltip-content="Logout"
        />
        <Tooltip id="logout-tooltip" place="bottom" />
      </div>
    </header>
  );
};

export default Header;
