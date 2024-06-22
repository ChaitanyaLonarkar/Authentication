import React from "react";
import { useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { IoIosUnlock } from "react-icons/io";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { IoMail } from "react-icons/io5";
import { useAuthContext } from "../context/AuthContext";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [authuser, setAuthuser] = useState(null);
  const navigate = useNavigate();

  const { authUser, setAuthUser } = useAuthContext();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://blog-app-nu-hazel.vercel.app/login",
        { email, password },
        {
          withCredentials: true,
        }
      );
      // console.log(response.data,"loginnnnnnnnnnnnnnn");
      localStorage.setItem("user", JSON.stringify(response.data.user));
      if (localStorage.getItem("user")) {
        toast.success(response.data.message || "User logged in successfully");
        // console.log(response.data.user);
        // setAuthUser(localStorage.getItem("user"));
        setAuthUser(response.data.user);
        // console.log("auth usser hai ham", authUser);
        navigate("/");
      }
      else{
        return error
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "An error occurred");
    }
  };
  return (
    <>
      <div
        className="  flex justify-center items-center"
        style={{ height: "90vh" }}
      >
        <div className="sign flex flex-col gap-5 rounded-lg bg-white sm:w-96  w-72  p-7  sm:px-12 sm:py-10  justify-center items-center max-[400px]:scale-90">
          <h1 className="font-bold text-3xl text-indigo-500">Login </h1>
          <form onSubmit={handleSubmit} className=" flex flex-col w-full gap-3">
            <div className="bg-slate-100 flex items-center gap-3  outline-none  p-3 w-full rounded-md mb-2">
              {/* <MdOutlineMarkEmailRead className="text-xl " /> */}
              <IoMail className="text-xl  text-slate-600 " />

              <input
                type="email"
                name="email"
                value={email}
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                required
                className=" bg-transparent placeholder:text-indigo-500 placeholder:text-sm outline-none max-[600px]:w-3/4 "
              />
            </div>
            <div className="bg-slate-100 flex items-center gap-3  outline-none  p-3 w-full rounded-md mb-2">
              <IoIosUnlock className="text-xl text-slate-600  " />
              <input
                type="password"
                name="password"
                value={password}
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                required
                className=" bg-transparent placeholder:text-indigo-500 placeholder:text-sm outline-none max-[600px]:w-3/4"
              />
            </div>

            <button
              type="submit"
              className="py-2 px-4 rounded-md bg-indigo-100 font-semibold  hover:bg-indigo-200 text-indigo-700 "
            >
              Submit
            </button>
            <span className="text-center">
              Dont have an account?{" "}
              <Link className="text-indigo-700 font-semibold" to={"/signup"}>
                SignUp
              </Link>
            </span>
            <Toaster />
          </form>
        </div>
      </div>
      {/* <div className="sign">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">Login</button>
          <span>
            Dont have an account? <Link to={"/signup"}>Signup</Link>
          </span>

        </form>
      </div> */}
    </>
  );
}
