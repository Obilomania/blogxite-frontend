import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { SD_Roles } from "../Utility/SD";
import inputHelpers from "../Helpers/inputHelpers";
import { useRegisterUserMutation } from "../Redux/Apis/authApi";
import apiResponse from "../Interfaces/apiResponse";
import { toast } from "react-toastify";
import toastNotify from "../Helpers/toastNotify";

let loginBg = require("../Assets/loginBG.jpg");

const Register = () => {
  const [registerUser] = useRegisterUserMutation();
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    userName: "",
    password: "",
    role: "",
    name: "",
  });

  const handleUserInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const tempData = inputHelpers(e, userInput);
    setUserInput(tempData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const response: apiResponse = await registerUser({
      userName: userInput.userName,
      name: userInput.name,
      password: userInput.password,
      role: userInput.role,
    });
    if (response.data) {
      toastNotify("Registration Successful!, please Log in to continue");
    } else if (response.error) {
      toastNotify(response.error.data.errorMessages[0]);
    }
    setLoading(false);
  };

  return (
    <Registerpage>
      <section className="landingPage">
        <div className="overlay"></div>
        <img src={loginBg} alt="" className="landingBG" />
      </section>
      <div className="registerForm">
        <form method="post" onSubmit={handleSubmit}>
          <h2>REGISTRATION</h2> <br />
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
          <div className="name">
            <label>NickName :</label> <br />
            <input
              type="text"
              value={userInput.name}
              name="name"
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
          <div className="dropdown">
            <select
              required
              value={userInput.role}
              name="role"
              onChange={handleUserInput}
            >
              <option value="">--Select Role--</option>
              <option value={`${SD_Roles.USER}`}>User</option>
              <option value={`${SD_Roles.ADMIN}`}>Admin</option>
            </select>
          </div>
          <br /> <br />
          <button style={{cursor:"pointer"}}>Register</button>
        </form>{" "}
        <br />
        <p
          style={{
            color: "var(--white)",
            fontWeight: "bold",
            fontSize: ".8rem",
          }}
        >
          Have an account? <Link to="/register">Login</Link>
        </p>
      </div>
    </Registerpage>
  );
};

const Registerpage = styled.div`
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
  .landingBG {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1;
  }
  .registerForm {
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
    }
  }
`;
export default Register;
