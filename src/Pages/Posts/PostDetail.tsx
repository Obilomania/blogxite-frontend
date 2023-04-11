import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetPostByIdQuery } from "../../Redux/Apis/postApi";
import styled from "styled-components";
import inputHelpers from "../../Helpers/inputHelpers";
import Comment from "../../Components/Comment";
import { useCreateCommentMutation } from "../../Redux/Apis/commentApi";
import { useDispatch, useSelector } from "react-redux";
import authInterface from "../../Interfaces/authInterface";
import { RootState } from "../../Redux/store";
import { setPosts } from "../../Redux/postSlice";
import AddCommentForm from "../../Components/AddCommentForm";
import commentInterface from "../../Interfaces/commentInterface";


const initialState = {
  commentContent: "",
  postId: "",
  userId: "",
};

const PostDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const userData: authInterface = useSelector(
    (state: RootState) => state.authStore
  );

  const { data, isLoading } = useGetPostByIdQuery(id);
  const [loading, setLoading] = useState(false);
  const [createComment] = useCreateCommentMutation();

  useEffect(() => {
    if (!isLoading) {
      dispatch(setPosts(data.result));
      console.log(data.result);
    }
  }, [isLoading]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <CommentPost>
      <div className="navbarcover"></div>
      <div className="commentSection">
        <div className="postSection">
          <div className="left">
            <h5>{data.result.title}</h5>
            <img src={data.result.imageUrl} alt="" />
            <p>{data.result.content}</p>
            <AddCommentForm/>            
            <div className="commentContent">
              <p>{data.result.comments.length} Comments</p>
              <p>{data.result.postDate}</p>
            </div>
          </div>
          <div className="right">
            {
              data.result.comments.length > 0 && 
              data.result.comments.map((comments: commentInterface, index: number) => {
                return <Comment comment={comments} key={index} />
              })
            }
          </div>
        </div>
      </div>
    </CommentPost>
  );
};

const CommentPost = styled.div`
  background: var(--background);
  width: 100%;
  height: 100vh;
  position: relative;
  font-size: 0.8rem;
  .navbarcover {
    width: 100%;
    height: 10vh;
    background: var(--grey);
  }
  .postSection {
    padding: 4rem 20rem 0rem 20rem;
    display: flex;
    justify-content: space-between;
    width: 100%;
    .left {
      position:relative;
      width: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      border-radius: 1rem;
      box-shadow: 7px 6px 20px 5px rgba(0, 0, 0, 0.3);
      -webkit-box-shadow: 7px 6px 20px 5px rgba(0, 0, 0, 0.3);
      -moz-box-shadow: 7px 6px 20px 5px rgba(0, 0, 0, 0.3);
      h5 {
        text-align: center;
        color: var(--primary);
        text-transform: uppercase;
      }
      p {
        text-align: justify;
        line-height: 1.2rem;
      }
      img {
        width: 15rem;
        border-radius: 1rem;
      }
      .commentContent {
        width: 95%;
        display: flex;
        position:absolute;
        bottom:0rem;
        justify-content: space-between;
        color: var(--primary);
        font-weight: bold;
        font-size:.7rem;
      }
    }

    //STYLING FOR COMMENT FORM
    
    .right {
      padding:1.2rem;
      width: 40%;
      height:70vh;
      overflow:auto;
      display: flex;
      flex-direction: column;
      gap: .5rem;
      h2 {
        text-align: center;
        color: var(--primary);
      }
      .comment {
        width: 100%;
        height:6rem;
        overflow:auto;
        display: flex;
        position:relative;
        flex-direction: column;
        background: var(--white);
        gap: .5rem;
        padding: 1rem;
        border-radius: 1rem;
        box-shadow: 7px 6px 20px 5px rgba(0, 0, 0, 0.3);
        -webkit-box-shadow: 7px 6px 20px 5px rgba(0, 0, 0, 0.3);
        -moz-box-shadow: 7px 6px 20px 5px rgba(0, 0, 0, 0.3);
        p {
          text-align: justify;
          width: 100%;
          line-height: 1rem;
        }
        .commentDetails {
          position:absolute;
          bottom:0;
          width: 85%;
          display: flex;
          justify-content: space-between;
          color: var(--primary);
          font-weight: bold;
          font-size:.7rem;
        }
      }
    }
  }
`;
export default PostDetail;
