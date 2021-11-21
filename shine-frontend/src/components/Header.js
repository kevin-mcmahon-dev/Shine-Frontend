import React from "react";
// import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {

  return (
    <header>
      <div className='logo'>
        Home
      </div>
      <div className='links'>
        <ul>
              <li>
                Hello User!
              </li>
              <li>
                Conversations
              </li>
              <li>
                My Account
              </li>
              <li className='btn' /*onClick={logout}*/>
                Log Out
              </li>
              <li>
                Settings
              </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;