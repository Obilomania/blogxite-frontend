import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import styled from "styled-components";

let myLogo = require("../Assets/logo.png");

const Header = () => {
  const [open, setOpen] = useState<any>(false);
  const handleCLick = () => setOpen(!open);

  return (
    <Nav>
      <nav className="navigation">
        <div className="logo">
          <NavLink to="/">
            <img src={myLogo} alt="" />
          </NavLink>
        </div>
        <ul className={open ? "nav-open" : "nav-close"}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/">About</NavLink>
          <NavLink to="/">Posts</NavLink>
          <NavLink to="/">Recent Posts</NavLink>
          <NavLink to="/">Recent Posts</NavLink>
          <NavLink to="/">Login</NavLink>
          <NavLink to="/">Logout</NavLink>
          <NavLink to="/">Register</NavLink>
        </ul>
        <div className="hamburger" onClick={handleCLick}>
          {open ? <FaTimes color="white" /> : <FaBars color="#8db640" />}
        </div>
      </nav>
    </Nav>
  );
};

const Nav = styled.div`
  width: 100%;
  position: relative;
  z-index: 10;
  .navigation {
    padding-top: 1.5rem;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5rem;
    position: absolute;
    .logo img {
      width: 4rem;
    }
    ul {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5rem;
      a {
        text-decoration: none;
        font-weight: 500;
        color: var(--white);
      }
    }
    ul a::after {
      content: "";
      width: 0%;
      height: 2px;
      background: var(--secondary);
      display: block;
      margin: auto;
      transition: 0.3s;
      margin-top: 0.3rem;
    }
    ul a:hover::after {
      width: 100%;
    }
    .hamburger {
      display: none;
    }
  }

  @media screen and (max-width: 940px) {
    width: 100%;
    position: relative;
    z-index: 10;
    .navigation {
      padding: 1rem;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 5rem;
      position: absolute;
      .logo img {
        width: 4rem;
      }
      .hamburger {
        display: flex;
        z-index: 10;
        cursor: pointer;
        font-size: 1.5rem;
        color:var(--secondary);
      }
      .nav-open {
        position: absolute;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100%;
        display: flex;
        padding-top: 15vh;
        align-items: center;
        justify-content: flex-start;
        flex-direction: column;
        gap: 3rem;
        background: var(--secondary);
        transition: 400ms all ease-in-out;
      }
      .nav-close {
        position: absolute;
        top: 0;
        left: -100%;
        height: 100vh;
        width: 100%;
        display: flex;
        padding-top: 15vh;
        align-items: center;
        justify-content: flex-start;
        flex-direction: column;
        gap: 3rem;
        background: var(--secondary);
        transition: 400ms all ease-in-out;
      }
      ul {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5rem;
        position: absolute;
        a {
          text-decoration: none;
          font-weight: 500;
          color: var(--white);
        }
      }
    }
  }
`;

export default Header;
