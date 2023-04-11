import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import inputHelpers from "../../Helpers/inputHelpers";
import toastNotify from "../../Helpers/toastNotify";
import { useDispatch } from "react-redux";
import { useCreatePostMutation, useGetPostByIdQuery, useUpdatePostMutation } from "../../Redux/Apis/postApi";

let loginBg = require("../../Assets/loginBG.jpg");

const postData = {
  title: "",
  content: "",
};

const PostUpsert = () => {
  const { id } = useParams();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageToStore, setImageToStore] = useState<any>();
  const [postInputs, setPostInputs] = useState(postData);
  const [loading, setLoading] = useState(false);
  const [updatePost] = useUpdatePostMutation();
  const [createPost] = useCreatePostMutation();
  const {data} = useGetPostByIdQuery(id)
  const navigate = useNavigate();

  useEffect(() => {
    if (data && data.result) {
      const tempData = {
        title: data.result.title,
        content: data.result.content, 
      };
      setPostInputs(tempData)
      setImagePreview(data.result.imageUrl);
    }
  },[data])

  const handlePostInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const tempData = inputHelpers(e, postInputs);
    setPostInputs(tempData);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const imgType = file.type.split("/")[1];
      const validImgTypes = ["jpeg", "jpg", "png"];

      const isImageTypeValid = validImgTypes.filter((e) => {
        return e === imgType;
      });

      if (file.size > 3000 * 1024) {
        setImageToStore("");
        toastNotify("File Must be less then 3 MB", "error");
        return;
      } else if (isImageTypeValid.length === 0) {
        setImageToStore("");
        toastNotify("File Must be in jpeg, jpg or png", "error");
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      setImageToStore(file);
      reader.onload = (e) => {
        const imgUrl = e.target?.result as string;
        setImagePreview(imgUrl);
      };
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!imageToStore && !id) {
      toastNotify("Please upload an image", "error");
      setLoading(false);
      return;
    }
    const formData = new FormData();
    formData.append("Title", postInputs.title);
    formData.append("Content", postInputs.content);
    if (imagePreview) formData.append("ImageFile", imageToStore);

    let response;
    if (id) {
      //update
      formData.append("Id", id);
      response = await updatePost({id, data: formData });
      toastNotify("Post updated successfully", "success");
    } else {
      //create
      response = await createPost(formData);
      toastNotify("Post created successfully", "success");
    }
    if (response) {
      setLoading(false);
      navigate("/postList");
    }
    setLoading(false);
  };

  return (
    <Create>
      <section className="landingPage">
        <div className="overlay"></div>
        <img src={loginBg} alt="" className="landingBG" />
      </section>

      <div className="loginForm">
        <h2 style={{ textAlign: "center", color: "white" }}>
          {id ? "Edit Post" : "Create a New Post"}
        </h2>
        <br />
        <div className="insideCreateForm">
          <form
            action="post"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <div className="title">
              <label> Post Title: :</label> <br />
              <input
                type="text"
                name="title"
                value={postInputs.title}
                onChange={handlePostInput}
              />
            </div>{" "}
            <br />
            <div className="content">
              <label> Content :</label>
              <br />
              <textarea
                style={{ resize: "none" }}
                rows={10}
                name="content"
                value={postInputs.content}
                onChange={handlePostInput}
              ></textarea>
            </div>{" "}
            <br />
            <div className="image">
              <input
                type="file"
                // accept="image/*"
                onChange={handleImageChange}
                style={{ cursor: "pointer" }}
              />
            </div>{" "}
            <br />
            <div className="btns">
              <button type="submit" style={{ cursor: "pointer" }}>
                {id ? "Update" : "Create"}
              </button>
              <a
                type="submit"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(-1)}
              >
                Back to List
              </a>
            </div>
          </form>
          <div className="imagePreview">
            {imagePreview && <img src={imagePreview} alt="Preview" />}
          </div>
        </div>
      </div>
    </Create>
  );
};

const Create = styled.div`
  width: 100%;
  height: 100vh;
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
  .loginForm {
    z-index: 3;
    position: absolute;
    top: 0;
    left: 0;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: fit-content;
    width: 50%;
    border-radius: 1rem;
    .insideCreateForm {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      background: rgba(255, 255, 255, 0.2);
      padding: 2rem;
    }
    form {
      color: var(--white);
      width: 70%;
      label {
        font-size: 0.8rem;
      }
      .btns {
        display: flex;
        align-items: center;
        justify-content: space-between;
        a {
          width: 40%;
          border-radius: 0.5rem;
          padding: 0.7rem;
          background: transparent;
          color: white;
          border: 1px solid lightgrey;
          transition: 400ms all ease-in-out;
          text-align:center;
          &:hover {
            background: rgba(255, 255, 255, 0.8);
            color: rgba(0, 0, 0, 0.7);
          }
        }
        button {
          width: 40%;
          border-radius: 0.5rem;
          padding: 0.7rem;
          background: transparent;
          color: white;
          border: 1px solid lightgrey;
          transition: 400ms all ease-in-out;
          &:hover {
            background: rgba(255, 255, 255, 0.8);
            color: rgba(0, 0, 0, 0.7);
          }
        }
      }
      input {
        width: 100%;
        border-radius: 0.5rem;
        padding: 0.7rem;
        background: transparent;
        color: white;
        border: 1px solid lightgrey;
      }
      textarea {
        color: white;
        width: 100%;
        border-radius: 0.5rem;
        padding: 0.7rem;
        background: transparent;
        border: 1px solid lightgrey;
      }
    }
    .imagePreview {
      margin-top: 1.1rem;
      width: 15rem;
      height: 15rem;
      /* border: 1px solid lightgrey; */
      border-radius: 0.5rem;
      overflow: hidden;
      img {
        width: 15rem;
        height: 15rem;
      }
    }
  }
`;
export default PostUpsert;
