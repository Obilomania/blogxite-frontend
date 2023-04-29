import React from "react";
import styled from "styled-components";

const About = () => {
  return (
    <AboutPG>
      <div className="container content">
        <h3 className="text-center">About BlogSite</h3> <br />
        <br />
        <div className="information">
          <p>
            Blog-Xite is a blog built with .net for the backend and react Js
            with typescript for the front end. The backend will be hosted on
            azure while the frontend will probably be hosted on vercel or
            netlify.
          </p>
          <p>
            It was designed by <span>Obinna Ishmael Iloanya</span> for fun sake
            and to prove typescript is always better and safer when you are
            building an appliation in which you will consume an API.
          </p>

          <p>
            Fortunately for me and thanks to Redux i was able to manage the
            state with redux and also make API calls with RTK query. This is one
            of the few times i didnt use fetch or axios.
          </p>

          <p>
            In this Blog application, you can view a post and also add comments
            to the post. sweet right? i know its sweet, i believe in freedom of
            speech, hahahahahah.
          </p>
        </div>
      </div>
    </AboutPG>
  );
};

const AboutPG = styled.div`
  background: var(--background);
  width: 100%;
  height: 100vh;
  .content {
    padding: 4rem 0rem;
    h3 {
      color: var(--light-variant);
      font-weight: 600;
    }
    p {
      text-align: justify;
      color: var(--light-variant);
      span {
        font-weight: bolder;
      }
    }
  }
  @media screen and (max-width: 940px){
    padding: 0 1rem;
  }
`;
export default About;
