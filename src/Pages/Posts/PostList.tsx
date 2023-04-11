import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  useDeletePostMutation,
  useGetPostsQuery,
} from "../../Redux/Apis/postApi";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../Redux/postSlice";
import Table from "react-bootstrap/Table";
import postInterface from "../../Interfaces/postInterface";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";

let loginBg = require("../../Assets/loginBG.jpg");

const PostList = () => {
  const { data, isLoading } = useGetPostsQuery(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deletePost] = useDeletePostMutation();



  useEffect(() => {
    if (!isLoading) {
      const posts = data.result
      dispatch(setPosts(posts));
      console.log(posts.length)
    }
  }, [isLoading]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const handlePostDelete = async (id: number) => {
    toast.promise(
      deletePost(id),
      {
        pending: "Processing your request...",
        success: "Post Deleted Successfully 👌",
        error: "Error encoutnered 🤯",
      },
      {
        theme: "dark",
      }
    );
  };

  return (
    <Posts>
      <section className="landingPage">
        <div className="overlay"></div>
        <img src={loginBg} alt="" className="landingBG" />
      </section>

      <div className="postListings listTable border rounded p-5">
        <div className="header">
          <h3>List Of Posts</h3>
          <button className="listBtn" onClick={() => navigate("/postUpsert")}>
            Add New post
          </button>
        </div>
        <Table
          striped
          bordered
          hover
          variant="transparent"
          className=" rounded"
        >
          <thead>
            <tr>
              <th className="text-center text-light">Photo</th>
              <th className="text-center text-light">Title</th>
              <th className="text-center text-light">No. of Comments</th>
              <th className="text-center text-light">Posted Date</th>
              <th className="text-center text-light">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.result.length > 0 &&
              data.result.map((post: postInterface, index: number) => {
                return (
                  <tr key={post.id}>
                    <td className="text-center text-light">
                      <img
                        src={post.imageUrl}
                        alt="no content"
                        style={{ width: "100%", maxWidth: "5rem" }}
                      />
                    </td>
                    <td className="text-center text-light">{post.title}</td>
                    <td className="text-center text-light">
                      {post.comments.length}
                    </td>
                    <td className="text-center text-light">{post.postDate}</td>
                    <td className="text-center text-light">
                      <button
                        className="btn"
                        style={{
                          background: "var(--secondary",
                          color: "white",
                        }}
                      >
                        <i
                          className="bi bi-pencil-fill"
                          onClick={() => navigate("/postUpsert/" + post.id)}
                        ></i>
                      </button>{" "}
                      &nbsp;
                      <button
                        className="btn"
                        style={{
                          background: "var(--primary",
                          color: "white",
                        }}
                      >
                        <i
                          className="bi bi-eye"
                          onClick={() => navigate("/postDetail/" + post.id)}
                        ></i>
                      </button>
                      <button
                        className="btn btn-danger mx-2"
                        onClick={() => handlePostDelete(post.id)}
                      >
                        <i className="bi bi-trash-fill"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
    </Posts>
  );
};

const Posts = styled.div`
  width: 100%;
  height: fit-content;
  overflow: hidden;
  position: relative;
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
    background: rgba(0, 0, 0, 0.7);
    z-index: 2;
  }
  .landingBG {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1;
  }
  .listTable {
    z-index: 3;
    position: absolute;
    top: 0;
    left: 0;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60%;
    height: 70vh;
    overflow: auto;
    .header {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      h3 {
        color: var(--primary);
      }
      button {
        color: white;
        background: var(--secondary);
        padding: 0.3rem 1.5rem;
        border-radius: 1rem;
        transition: 400ms all ease;
        &:hover {
          background: var(--light-secondary);
          transition: 400ms all ease;
        }
      }
    }
  }
`;
export default PostList;
