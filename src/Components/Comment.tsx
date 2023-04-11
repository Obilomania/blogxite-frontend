import React from "react";
import commentInterface from "../Interfaces/commentInterface";

interface Props {
  comment: commentInterface;
}
const Comment = (props:Props) => {
  
  return (
    <div>
      <div className="comment">
        <p>{props.comment.commentContent}</p>
        <div className="commentDetails">
          <p>{props.comment.commentedOn}</p>
          <p style={{ textAlign: "end" }}>
            <i>by </i>{!props.comment.commenter ? "Annonymous" : props.comment.commenter}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
