import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Postings from "../../Components/Postings";
import postInterface from "../../Interfaces/postInterface";
import { useGetPostsQuery } from "../../Redux/Apis/postApi";
import { useDispatch } from "react-redux";
import { setPosts } from "../../Redux/postSlice";
import Loading from "../../Components/Loading";

const RecentPost = () => {
  // const [posts, setPosts] = useState<postInterface[]>([]);
  const { data, isLoading } = useGetPostsQuery(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoading) {
      dispatch(setPosts(data.result));
    }
  }, [isLoading, dispatch, data]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Recent>
      <div className="recent">
        {/* <h1 className="recentHeader">Posts</h1> */}
        <hr />
        {data.result.length > 0 &&
          data.result.map((post: postInterface, index: number) => {
            return <Postings post={post} key={index} />;
          })}
      </div>
    </Recent>
  );
};

const Recent = styled.div`
  width: 100%;
  background: var(--background);
  a {
    text-decoration: none;
  }
  a:visited {
    color: none;
  }
  .recent {
    padding: 3rem 20rem;
  }
  .recentHeader {
    text-align: center;
    color: var(--secondary);
    margin-bottom: 0.7rem;
  }
  hr {
    background: var(--primary);
    height: 0.3rem;
    width: 8rem;
    margin: auto;
  }
  .onePost {
    position: relative;
    margin-top: 2rem;
    width: 100%;
    height: 20rem;
    display: flex;
    justify-content: space-between;
    gap: 3rem;
    overflow: hidden;
    padding: 3rem 3rem;
    border-radius: 1rem;
    margin-bottom: 2rem;
    box-shadow: 7px 6px 20px 5px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 7px 6px 20px 5px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 7px 6px 20px 5px rgba(0, 0, 0, 0.3);
  }
  .left {
    display: flex;
    flex-direction: column;
    align-items: start;
    z-index: 3;
    gap: 1rem;
    h5 {
      color: var(--secondary);
      text-transform: uppercase;
    }
    p {
      line-height: 1.5rem;
      width: 100%;
      text-align: justify;
      color: var(--white);
      font-size: 0.8remrem;
    }
    span {
      color: var(--primary);
      font-size: 0.7rem;
    }
    .postcontent {
      display: flex;
      justify-content: space-between;
      width: 100%;
      color: var(--primary);
      position: absolute;
      bottom: 15%;
    }
  }
  .right {
    z-index: 3;
    img {
      width: 15rem;
      height: 15rem;
      border-radius: 1rem;
    }
  }
  @media screen and (max-width: 940px) {
    width: 100%;
    background: var(--background);
    a {
      text-decoration: none;
    }
    a:visited {
      color: none;
    }
    .recent {
      padding: 1rem;
    }
    .recentHeader {
      text-align: center;
      color: var(--secondary);
      margin-bottom: 0.7rem;
    }
    hr {
      background: var(--primary);
      height: 0.3rem;
      width: 8rem;
      margin: auto;
    }
    .onePost {
      position: relative;
      margin-top: 2rem;
      width: 100%;
      height: fit-Content;
      display: flex;
      flex-direction: column-reverse;
      align-items: center;
      justify-content: space-between;
      gap: 3rem;
      overflow: hidden;
      padding: 1rem 3rem;
      border-radius: 1rem;
      margin-bottom: 2rem;
      box-shadow: 7px 6px 20px 5px rgba(0, 0, 0, 0.3);
      -webkit-box-shadow: 7px 6px 20px 5px rgba(0, 0, 0, 0.3);
      -moz-box-shadow: 7px 6px 20px 5px rgba(0, 0, 0, 0.3);
    }
    .left {
      display: flex;
      flex-direction: column;
      align-items: center;
      z-index: 3;
      gap: 1rem;
      h5 {
        color: var(--secondary);
        text-transform: uppercase;
      }
      p {
        line-height: 1.5rem;
        width: 100%;
        text-align: justify;
        color: var(--white);
        font-size: 0.8rem;
      }
      span {
        color: var(--primary);
        font-size: 0.7rem;
      }
      .postcontent {
        display: flex;
        justify-content: space-between;
        width: 100%;
        color: var(--primary);
        position: absolute;
        bottom: 2%;
        left: 45%;
      }
    }
    .right {
      z-index: 3;
      img {
        width: 100%;
        height: 10rem;
        border-radius: 1rem;
      }
    }
  }
`;
export default RecentPost;
