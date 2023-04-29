import React from "react";
import styled from "styled-components";
import { BsLinkedin, BsInstagram } from "react-icons/bs";
import { MdMarkEmailUnread } from "react-icons/md";

const Contact = () => {
  return (
    <ContactPG>
      <div className="container">
        <div className="content">
          <h3 className="text-center">Contact the Blogger</h3> <br />
          <br />
          <div className="information">
            <p>
              <BsLinkedin /> : www.linkedin.com/in/obilomania
            </p>
            <p>
              <BsInstagram /> : @obilomania
            </p>

            <p>
              <MdMarkEmailUnread /> : iloanyaobinna@gmail.com
            </p>

            <p>
              <span>Portfolio</span> : www.obilomania.com/portfolio
            </p>
          </div>
        </div>
      </div>
    </ContactPG>
  );
};

const ContactPG = styled.div`
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
`;
export default Contact;
