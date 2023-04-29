import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Redux/store";
import authInterface from "../Interfaces/authInterface";
import { initialState, setLoggedInUser } from "../Redux/authSlice";
import toastNotify from "../Helpers/toastNotify";

let myLogo = require("../Assets/logo.png");

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [navBar, setNavBar] = useState(false);
  const [open, setOpen] = useState<any>(false);
  const handleCLick = () => setOpen(!open);

  // const changeNavBG = () => {
  //   if (window.scrollY >= 80) {
  //     setNavBar(true);
  //   } else {
  //     setNavBar(false);
  //   }
  // };

  // window.addEventListener("scroll", changeNavBG);

  const userData: authInterface = useSelector(
    (state: RootState) => state.authStore
  );

  //LogOut function
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(setLoggedInUser({ ...initialState }));
    navigate("/");
    toastNotify("Logout Successful");
  };

  return (
    <Nav className="active">
      <nav className={navBar ? "navigation2" : "navigation"}>
        <div className="logo">
          <NavLink to="/">
            <img src={myLogo} alt="" />
          </NavLink>
        </div>
        <ul className={open ? "nav-open" : "nav-close"}>
          <NavLink to="/" onClick={handleCLick}>Home</NavLink>
          <NavLink to="/about" onClick={handleCLick}>About</NavLink>
          <NavLink to="/contact" onClick={handleCLick}>Contact</NavLink>
          {userData.role === "admin" && (
            <>
              <NavLink to="/postUpsert" onClick={handleCLick}>Create Post</NavLink>
              <NavLink to="/postList" onClick={handleCLick}>Posts</NavLink>
            </>
          )}
          {userData.id && (
            <>
              <NavLink to="/" onClick={handleCLick}>
                Welcome{" "}
                <span style={{ color: "var(--primary)", fontWeight: "bold" }}>
                  {userData.fullName}!
                </span>
              </NavLink>
              <button
                className="log"
                onClick={handleLogout}
                style={{ border: "none", cursor: "pointer" }}
              >
                Logout
              </button>
            </>
          )}
          {!userData.id && (
            <>
              <NavLink to="/login" onClick={handleCLick}>Login</NavLink>
              <NavLink to="/register" onClick={handleCLick}>Register</NavLink>
            </>
          )}
        </ul>
        <div className="hamburger" onClick={handleCLick}>
          {open ? <FaTimes color="#8db640" /> : <FaBars color="#8db640" />}
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
    background: var(--background);
    width: 100%;
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5rem;
    /* border-bottom: 3px solid var(--light-variant); */
    .logo img {
      width: 5rem;
    }

    ul {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top:2rem;
      gap: 10rem;
      a {
        text-decoration: none;
        font-weight: 600;
        color: var(--light-variant);
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
    .log {
      background: var(--primary);
      color: var(--white);
      padding: 0.6rem 2rem;
      border-radius: 1.5rem;
      transition: 400ms all ease-in-out;
    }
    .log:hover {
      transition: 400ms all ease-in-out;
      background: var(--light-primary);
    }
  }

  //NAVIGATION 2
  .navigation2 {
    background: grey;
    position: fixed;
    top: 0;
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5rem;
    transition: 400ms all ease-in-out;
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
    .log {
      background: var(--primary);
      color: var(--white);
      padding: 0.6rem 2rem;
      border-radius: 1.5rem;
      transition: 400ms all ease-in-out;
    }
    .log:hover {
      transition: 400ms all ease-in-out;
      background: var(--light-primary);
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
      .logo img {
        width: 4rem;
      }
      .hamburger {
        display: flex;
        z-index: 10;
        cursor: pointer;
        font-size: 1.5rem;
        color: var(--secondary);
      }
      .nav-open {
        position: absolute;
        top: 5vh;
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
        top: 5vh;
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
