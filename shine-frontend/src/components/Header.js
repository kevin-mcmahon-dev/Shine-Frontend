import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Header = () => {

  const nav = useNavigate();

  function Logout() {
    localStorage.removeItem("uid")
    nav("/");
    window.location.reload()
  }

  return (
    <header>
      <nav className="navbar navbar-expand-custom navbar-dark navbar-bg">
        <div className="navbar-brand">
          <Link to={`/`}>
            <div className='nav-link'><img className='logoSmall' src="/logo-dark.png" alt="logo"></img></div>
          </Link>
        </div>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsingNavbar">
          <span class="navbar-toggler-icon"></span>
        </button>
        {/* <div className="collapse navbar-collapse w-100 order-1 order-md-0 dual-collapse2" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link style={{ textDecoration: 'none' }} to={`/`}>
                  <div className='nav-link'>SHINE</div>
                </Link>
              </li>
            </ul>
        </div> */}
        <div className="navbar-collapse collapse" id="collapsingNavbar">
          {/* <ul className="navbar-nav ml-auto"> */}
            {/* <li className="nav-item">
              <Link style={{ textDecoration: 'none' }} to={`/register`}>
                <div className='nav-link'><span>Register</span></div>
              </Link>
            </li>
            <li className="nav-item">
              <Link style={{ textDecoration: 'none' }} to={`/login`}>
                <div className='nav-link'><span>Login</span></div>
              </Link>
            </li> */}
            {localStorage.getItem("uid") === null ?      
            <ul className="navbar-nav ml-auto">      
            <li className="nav-item">
              <Link style={{ textDecoration: 'none' }} to={`/register`}>
                <div className='nav-link'><span>Register</span></div>
              </Link>
            </li>
            <li className="nav-item">
              <Link style={{ textDecoration: 'none' }} to={`/login`}>
                <div className='nav-link'><span>Login</span></div>
              </Link>
            </li> 
            </ul> :
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                {/* <Link style={{ textDecoration: 'none' }}> */}
                  <div className='nav-link' onClick={Logout}><span>Logout</span></div>
                {/* </Link> */}
              </li>
              <li className="nav-item">
                <Link style={{ textDecoration: 'none' }} to={`/profile`}>
                  <div className='nav-link'><span>Profile</span></div>
                </Link>
              </li>
            </ul>}
        </div>
      </nav>
      {/* <div className='logo'>
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
              </Link> */}

      {/* </div> */}
    </header>
  );
};

export default Header;