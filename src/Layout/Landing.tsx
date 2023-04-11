import React from "react";
import styled from "styled-components";
import RecentPost from "../Pages/Posts/RecentPost";

let homeBG = require("../Assets/BG1.jpg");

const Landing = () => {
  return (
    <Home>
      <section className="landingPage">
        <div className="overlay"></div>
        <img src={homeBG} alt="" className="landingBG" />
      </section>

      {/* Recent Post Section */}
      <RecentPost />
    </Home>
  );
};

const Home = styled.div`
  width: 100%;
  height: fit-content;
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
    background: rgba(0, 0, 0, 0.5);
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
