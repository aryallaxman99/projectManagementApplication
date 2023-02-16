import React, { useState } from "react";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import "rc-dropdown/assets/index.css";
import { resetUserDetails } from "../../reducers/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toogleMenu = () => {
    setShowMenu(!showMenu);
  };

  const logout = () => {
    dispatch(resetUserDetails());
    navigate("/");
  };

  return (
    <nav className="nav">
      <div className="nav_logo">
        <AiOutlineFundProjectionScreen className="nav_icon" />
      </div>
      <div className="nav_search">
        <input
          type="text"
          placeholder="Search Projects"
          onKeyUp={(event) => console.log(event.target.value)}
        />
      </div>
      <div className="nav_links">
        <a href="/">Home</a>
        <a href="/notifications">Notifications</a>
        <a href="#">Messages</a>
      </div>
      <div className="nav_profile" onClick={toogleMenu}>
        <img src="https://picsum.photos/id/1005/50/50" alt="Profile" />
        {showMenu && (
          <div className="dropdown-content">
            <li href="#">Profile</li>
            <li href="#">Settings</li>
            <li onClick={logout}>Logout</li>
          </div>
        )}
      </div>
    </nav>
  );
};
export default Header;
