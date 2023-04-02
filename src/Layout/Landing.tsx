import React from "react";
import styled from "styled-components";

let homeBG = require("../Assets/BG1.jpg");

const Landing = () => {
  return (
    <Home>
      <div className="overlay"></div>
      <img src={homeBG} alt="" className="landingBG" />
    </Home>
  );
};

const Home = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    z-index: 2;
  }
  .landingBG {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    z-index: 1;
  }
`;
export default Landing;
