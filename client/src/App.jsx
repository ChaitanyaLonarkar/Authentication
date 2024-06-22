import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import "./App.css";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CreateBlog from "./Pages/CreateBlog";
import SelectedBlog from "./Pages/SelectedBlog";
import UpdateBlog from "./Pages/UpdateBlog";
import Profile from "./Pages/Profile";
import Search from "./Pages/Search";
import { useAuthContext } from "./context/AuthContext";
import UserInfo from "./Pages/UserInfo";
import ProfileUpdate from "./Pages/ProfileUpdate";

function App() {
  const [count, setCount] = useState(0);
  // const navigate = useNavigate();
  const { authUser } = useAuthContext();
  // console.log(authUser,"from aoo")
  
  
  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route index element={<Home />} />
          <Route
            path="/signup"
            element={authUser ? <Navigate to="/" replace /> : <Signup />}
          />
          <Route
            path="/login"
            element={authUser ? <Navigate to="/" replace /> : <Login />}
          />
          <Route path="/createBlog" element={<CreateBlog />} />
          <Route path="/bloginfo/:id" element={<SelectedBlog />} />
          <Route path="/updateBlog/:id" element={<UpdateBlog />} />
          <Route path="/myprofile" element={<Profile />} />
          <Route path="/search" element={<Search />} />
          <Route path="/userinfo/:id" element={<UserInfo />} />
          <Route path="/profileUpdate/:id" element={<ProfileUpdate />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;
