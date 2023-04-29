import React, { useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./Components/Header";
import Landing from "./Layout/Landing";
import NotFound from "./Pages/NotFound";
import PostDetail from "./Pages/Posts/PostDetail";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import authInterface from "./Interfaces/authInterface";
import { useDispatch } from "react-redux";
import { setLoggedInUser } from "./Redux/authSlice";
import jwt_Decode from "jwt-decode";
import AuthenticationTest from "./Pages/AuthenticationTest";
import AuthenticationTestAdmin from "./Pages/AuthenticationTestAdmin";
import AccessDenied from "./Pages/AccessDenied";
import PostList from "./Pages/Posts/PostList";
import PostUpsert from "./Pages/Posts/PostUpsert";
import Footer from "./Layout/Footer";
import About from "./Pages/About";
import Contact from "./Pages/Contact";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      const { fullName, id, email, role }: authInterface =
        jwt_Decode(localToken);
      dispatch(setLoggedInUser({ fullName, id, email, role }));
    }
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/postDetail/:id" element={<PostDetail />} />
        <Route path="/postUpsert/:id" element={<PostUpsert />} />
        <Route path="/postUpsert" element={<PostUpsert />} />
        <Route path="/postList" element={<PostList />} />
        <Route path="*" element={<NotFound />} />

        <Route path="/authentication" element={<AuthenticationTest />} />
        <Route path="/authorization" element={<AuthenticationTestAdmin />} />
        <Route path="/accessDenied" element={<AccessDenied />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      {/* <Footer/> */}
    </BrowserRouter>
  );
}

export default App;
