import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import inputHelpers from "../Helpers/inputHelpers";
import apiResponse from "../Interfaces/apiResponse";
import { useLoginUserMutation } from "../Redux/Apis/authApi";
import jwt_decode from "jwt-decode";
import authInterface from "../Interfaces/authInterface";
import { useDispatch } from "react-redux";
import { setLoggedInUser } from "../Redux/authSlice";
import toastNotify from "../Helpers/toastNotify";



let loginBg = require("../Assets/loginBG.jpg");

const Login = () => {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginUser] = useLoginUserMutation();
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    userName: "",
    password: "",
  });

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = inputHelpers(e, userInput);
    setUserInput(tempData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const response: apiResponse = await loginUser({
      userName: userInput.userName,
      password: userInput.password,
    });
    if (response.data) {
      const { token } = response.data.result;
      const { fullName, id, email, role }: authInterface = jwt_decode(token);
      localStorage.setItem("token", token);
      dispatch(setLoggedInUser({ fullName, id, email, role }));
      navigate("/");
      toastNotify("Login Successful", "success");
    } else if (response.error) {
      toastNotify(response.error.data.errorMessages[0], "error");
    }
    setLoading(false);
  };

  return (
    <LoginPage>
      <section className="landingPage">
        <div className="overlay"></div>
        <img src={loginBg} alt="" className="landingBG" />
      </section>
      <div className="loginForm">
        {/* {loading && {<Loader}} */}
        <form method="post" onSubmit={handleSubmit}>
          <h2>Log In</h2> <br />
          <div className="email">
            <label>Email :</label> <br />
            <input
              type="text"
              value={userInput.userName}
              name="userName"
              onChange={handleUserInput}
            />
          </div>{" "}
          <br />
          <div className="password">
            <label>Password :</label> <br />
            <input
              type="password"
              value={userInput.password}
              name="password"
              onChange={handleUserInput}
            />
          </div>{" "}
          <br />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <br />
          <button>Login</button>
        </form>{" "}
        <br />
        <p
          style={{
            color: "var(--white)",
            fontWeight: "bold",
            fontSize: ".8rem",
          }}
        >
          Dont have an account? <Link to="/register">sign up</Link>
        </p>
      </div>
    </LoginPage>
  );
};

const LoginPage = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
  .landingPage {
    position: relative;
    width: 100%;
    height: 100vh;
  }
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.7);
    z-index: 2;
  }
  .landingBG {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1;
  }
  .loginForm {
    z-index: 3;
    position: absolute;
    top: 0;
    left: 0;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(255, 255, 255, 0.2);
    padding: 2rem;
    height: fit-content;
    width: 20%;
    border-radius: 1rem;
    h2 {
      text-align: center;
      color: var(--secondary);
    }
    input {
      width: 100%;
      outline: 0;
      border: 0;
      padding: 1rem;
      border-radius: 1rem;
      margin-top: 0.5rem;
    }
    label {
      font-weight: bold;
      color: var(--secondary);
    }
    button {
      width: 100%;
      outline: 0;
      border: 0;
      padding: 1rem;
      border-radius: 1rem;
      background: var(--dark-variant);
      color: var(--secondary);
      transition: 400ms all ease;
      font-weight: bold;
      cursor: pointer;
    }
  }
`;
export default Login;
