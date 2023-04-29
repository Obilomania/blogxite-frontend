import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetPostByIdQuery } from "../../Redux/Apis/postApi";
import styled from "styled-components";
import Comment from "../../Components/Comment";
import { useCreateCommentMutation } from "../../Redux/Apis/commentApi";
import { useDispatch, useSelector } from "react-redux";
import authInterface from "../../Interfaces/authInterface";
import { RootState } from "../../Redux/store";
import { setPosts } from "../../Redux/postSlice";
import commentInterface from "../../Interfaces/commentInterface";
import inputHelpers from "../../Helpers/inputHelpers";
import apiResponse from "../../Interfaces/apiResponse";
import toastNotify from "../../Helpers/toastNotify";
import Loading from "../../Components/Loading";

const PostDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData: authInterface = useSelector(
    (state: RootState) => state.authStore
  );
  const { data, isLoading } = useGetPostByIdQuery(id);
  const [createComment] = useCreateCommentMutation();
  const [commentInput, setCommentInput] = useState({
    commentContent: "",
    postId: id,
    userId: userData.id,
    commenter: userData.fullName,
  });

  const handleCommentInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const tempData = inputHelpers(e, commentInput);
    setCommentInput(tempData);
  };

  useEffect(() => {
    if (!isLoading) {
      dispatch(setPosts(data.result));
    }
  }, [isLoading]);

  if (isLoading) {
    return <Loading />;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(commentInput.commentContent);
    console.log(commentInput.commenter);
    console.log(commentInput.userId);
    console.log(commentInput.postId);
    const response: apiResponse = await createComment({
      commentContent: commentInput.commentContent,
      postId: commentInput.postId,
      userId: commentInput.userId,
      commenter: commentInput.commenter,
    });
    if (response.data) {
      window.location.reload();
      toastNotify("Comment Added successfully");
    } else if (response.error) {
      toastNotify(response.error.data.errorMessages[0]);
    }
  };

  return (
    <CommentPost>
      <div className="commentSection">
        <div className="postSection">
          <div className="left">
            <h5>{data.result.title}</h5>
            <img src={data.result.imageUrl} alt="" />
            <p>{data.result.content}</p>

            {/* ADD COMMENT FORM */}
            <div className="commentForm">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  hidden
                  name="postId"
                  value={commentInput.postId}
                  onChange={handleCommentInput}
                />
                <input
                  type="text"
                  hidden
                  name="userId"
                  value={commentInput.userId}
                  onChange={handleCommentInput}
                />
                <input
                  type="text"
                  hidden
                  name="commenter"
                  value={commentInput.commenter}
                  onChange={handleCommentInput}
                />
                <textarea
                  placeholder="Add Comment Here..."
                  name="commentContent"
                  value={commentInput.commentContent}
                  onChange={handleCommentInput}
                ></textarea>
                <button>Add Comment</button>
              </form>
            </div>
            <div className="commentContent">
              <p>{data.result.comments.length} Comments</p>
              <p>{data.result.postDate}</p>
            </div>
          </div>

          {/* COMMENTS */}
          <div className="right">
            {data.result.comments.length > 0 &&
              data.result.comments.map(
                (comments: commentInterface, index: number) => {
                  return <Comment comment={comments} key={index} />;
                }
              )}
          </div>
        </div>
      </div>
    </CommentPost>
  );
};

const CommentPost = styled.div`
  background: var(--background);
  width: 100%;
  min-height: 100vh;
  position: relative;
  font-size: 0.8rem;

  .postSection {
    padding: 4rem 20rem 0rem 20rem;
    display: flex;
    justify-content: space-between;
    width: 100%;
    .left {
      position: relative;
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
        position: absolute;
        bottom: 0rem;
        justify-content: space-between;
        color: var(--primary);
        font-weight: bold;
        font-size: 0.7rem;
      }
    }

    //STYLING FOR COMMENT FORM
    .commentForm {
      position: absolute;
      bottom: 3rem;
      width: 95%;
      form {
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        border-radius: 1rem;
      }
      textarea {
        border: none;
        resize: none;
        height: 4rem;
        width: 80%;
        padding: 1rem;
      }
      textarea:focus {
        border: none;
        outline: none;
      }
      button {
        height: 4rem;
        width: 20%;
        background: var(--dark-variant);
        border: none;
        color: var(--white);
        cursor: pointer;
        transition: 400ms all ease;
      }
      button:hover {
        background: var(--light-variant);
        transition: 400ms all ease;
      }
    }

    .right {
      padding: 1.2rem;
      width: 40%;
      height: 70vh;
      overflow: auto;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      h2 {
        text-align: center;
        color: var(--primary);
      }
      .comment {
        width: 100%;
        height: 6rem;
        overflow: auto;
        display: flex;
        position: relative;
        flex-direction: column;
        background: var(--white);
        gap: 0.5rem;
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
          position: absolute;
          bottom: 0;
          width: 85%;
          display: flex;
          justify-content: space-between;
          color: var(--primary);
          font-weight: bold;
          font-size: 0.7rem;
        }
      }
    }
  }
  @media screen and (max-width: 940px) {
    background: var(--background);
    width: 100%;
    min-height: 100vh;
    position: relative;
    font-size: 0.8rem;

    .postSection {
      padding: 1rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;
      .left {
        position: relative;
        width: 100%;
        height: fit-content;
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
          margin-bottom: 3rem;
        }
        img {
          width: 15rem;
          border-radius: 1rem;
        }
        .commentContent {
          width: 100%;
          display: flex;
          position: relative;
          bottom: 0rem;
          justify-content: space-between;
          color: var(--primary);
          font-weight: bold;
          font-size: 0.7rem;
        }
      }

      //STYLING FOR COMMENT FORM
      .commentForm {
        position: relative;
        bottom: 3rem;
        width: 100%;
        form {
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border-radius: 1rem;
        }
        textarea {
          border: none;
          resize: none;
          height: 4rem;
          width: 80%;
          padding: 1rem;
        }
        textarea:focus {
          border: none;
          outline: none;
        }
        button {
          height: 4rem;
          width: 20%;
          background: var(--dark-variant);
          border: none;
          color: var(--white);
          cursor: pointer;
          transition: 400ms all ease;
        }
        button:hover {
          background: var(--light-variant);
          transition: 400ms all ease;
        }
      }

      .right {
        margin-top:2rem;
        padding: 0rem;
        width: 100%;
        height: fit-content;
        overflow: auto;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        h2 {
          text-align: center;
          color: var(--primary);
        }
        .comment {
          width: 100%;
          height: 6rem;
          overflow: auto;
          display: flex;
          position: relative;
          flex-direction: column;
          background: var(--white);
          gap: 0.5rem;
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
            position: absolute;
            bottom: 0;
            width: 85%;
            display: flex;
            justify-content: space-between;
            color: var(--primary);
            font-weight: bold;
            font-size: 0.7rem;
          }
        }
      }
    }
  }
`;
export default PostDetail;
