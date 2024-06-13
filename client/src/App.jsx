import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import "./App.css";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import Navbar from "./components/Navbar";
import CreateBlog from "./Pages/CreateBlog";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createBlog" element={<CreateBlog />} />

          {/* <Route index element={(localStorage.getItem("user"))? <Home /> :<Navigate to={"/login"}/>} />
          <Route path="/signup" element={(localStorage.getItem("user"))? <Navigate to={"/"}/>: <Signup />} />
          <Route path="/login" element={(localStorage.getItem("user"))? <Navigate to={"/"}/>: <Login />} />
          <Route path="/createBlog" element={(localStorage.getItem("user"))? <CreateBlog />:<Navigate to={"/login"}/>} /> */}
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;
