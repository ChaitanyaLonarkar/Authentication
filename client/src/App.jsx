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

function App() {
  const [count, setCount] = useState(0);
  // const navigate = useNavigate();

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createBlog" element={<CreateBlog />} />
          <Route path="/b" element={<SelectedBlog />} />
          <Route path="/updateBlog" element={<UpdateBlog />} />
          <Route path="/myprofile" element={<Profile />} />
          <Route path="/search" element={<Search />} />

          {/* <Route index element={(localStorage.getItem("user"))? <Home /> :<Navigate to={"/login"}/>} />
          <Route path="/signup" element={(localStorage.getItem("user"))? <Navigate to={"/"}/>: <Signup />} />
          <Route path="/login" element={(localStorage.getItem("user"))? <Navigate to={"/"}/>: <Login />} />
          <Route path="/createBlog" element={(localStorage.getItem("user"))? <CreateBlog />:<Navigate to={"/login"}/>} /> */}
        </Routes>
        <Footer/>
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;
