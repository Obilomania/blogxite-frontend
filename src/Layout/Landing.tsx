import React from "react";
import styled from "styled-components";
import RecentPost from "../Pages/Posts/RecentPost";
import Carousel from "react-bootstrap/Carousel";

let image1 = require("../Assets/BLogXite1.png");
let image2 = require("../Assets/BLogXite2.png");

const Landing = () => {
  return (
    <Home>
      <div className="container">
        <Carousel fade indicators={false} controls={false}>
          <Carousel.Item>
            <img className="d-block w-100" src={image1} alt="First slide" />
          </Carousel.Item>
        </Carousel>
      </div>
      <RecentPost />
    </Home>
  );
};

const Home = styled.div`
  width: 100%;
  min-height: 100vh;
  background: var(--background);

`;
export default Landing;
