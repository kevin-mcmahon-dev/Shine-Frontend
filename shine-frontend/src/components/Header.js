import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {

  return (
    <header>
      <div className='logo'>
      <Link to={`/`}>
        <div className='spanHeader'><span>Home</span></div>
      </Link>
      </div>
      <div className='links'>
              <Link to={`/register`}>
                    <div className='linkContainer spanHeader'><span>Register</span></div>
              </Link>

              <Link to={`/login`}>
                    <div className='linkContainer spanHeader'><span>Login</span></div>
              </Link>

              <Link to={`/profile`}>
                    <div className='linkContainer spanHeader'><span>Profile</span></div>
              </Link>

      </div>
    </header>
  );
};

export default Header;