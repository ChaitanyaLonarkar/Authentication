import React from "react";
import { useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { IoIosUnlock } from "react-icons/io";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { IoMail } from "react-icons/io5";
import { useAuthContext } from "../context/AuthContext";
import { Server } from "../context/TimeAgo";
import BeatLoader from "react-spinners/BeatLoader";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const { authUser, setAuthUser } = useAuthContext();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in both email and password");
      return;
    }
    setLoader(true);

    try {
      const response = await axios.post(
        Server + "auth/login",
        { email, password },
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message || "User logged in successfully");
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setAuthUser(response.data.user);
        navigate("/");
        setLoader(false)
      } else {
        toast.error(response.data.message);
      }
      
    } catch (error) {
      toast.error(error.response.data.message);
      // console.log(error);
    }finally {
      setLoader(false);
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
              {loader ? (
                <div className="flex  p-[0.35rem] justify-center ">
                  <BeatLoader size={10} />
                </div>
              ) : (
                <div>Submit</div>
              )}
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
    </>
  );
}
