import React from "react";
import styled from "styled-components";

const AddCommentForm = () => {
  return (
    <CommentForm>
      <div className="commentForm">
        <form action="post">
          <input type="text" readOnly hidden name="userId" />
          <input type="text" hidden name="id" readOnly />
          <textarea
            placeholder="Add Comment Here..."
            name="commentContent"
          ></textarea>
          <button>Add Comment</button>
        </form>
      </div>
    </CommentForm>
  );
};

const CommentForm = styled.div`
  width: 100%;
  position:absolute;
  bottom:3rem;
  width:95%;
  .commentForm {
    width: 100%;

    position: relative;
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
`;
export default AddCommentForm;
