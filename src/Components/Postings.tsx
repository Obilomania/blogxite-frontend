import React from "react";
import styled from "styled-components";
import postInterface from "../Interfaces/postInterface";
import { Link } from "react-router-dom";

interface Props {
  post: postInterface;
}
const Postings = (props: Props) => {
  return (
    <Post>
      <Link to={`/postDetail/${props.post.id}`}>
        <div className="onePost">
          <div className="postOverlay"></div>
          <img src={props.post.imageUrl} alt="" className="postBg" />
          <div className="left">
            <h5>{props.post.title}</h5>
            <p>
              {props.post.content}{" "}
              <span>
                <b>
                  <i>read more...</i>
                </b>
              </span>
            </p>
            <div className="postcontent">
              <span className="commentCount">
                {props.post.comments.length} comments
              </span>
            </div>
          </div>
          <div className="right">
            <img src={props.post.imageUrl} alt="" />
          </div>
        </div>
      </Link>
    </Post>
  );
};

const Post = styled.div`
  .postBg {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 0;
    width: 100%;
  }
  .postOverlay {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    width: 100%;
    height:100%;
    background:rgba(0,0,0,.7)
  }
`;
export default Postings;
