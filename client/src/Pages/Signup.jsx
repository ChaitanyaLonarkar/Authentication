import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { FaUserPen } from "react-icons/fa6";
import { IoIosLock } from "react-icons/io";
import { IoIosUnlock } from "react-icons/io";
import { IoMail } from "react-icons/io5";
export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confpassword, setconfPassword] = useState("");

  // const notify = () => ;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/signup",
        { name, email, password, confpassword },
        {
          withCredentials: true,
        }
      ); // Make sure the URL is correct

      if (!localStorage.getItem("user")) {

        toast.success(response.data.message || "User created successfully");
        navigate("/login");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || "An error occurred";
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <div
        className="  flex justify-center items-center"
        style={{ height: "90vh" }}
      >
        <div className="sign flex flex-col gap-5 rounded-lg bg-white w-96 px-12 py-10  justify-center items-center">
          <h1 className="font-bold text-3xl text-indigo-500">Join Us </h1>
          <form onSubmit={handleSubmit} className=" flex flex-col w-full gap-3">
            <div className="bg-slate-100 flex items-center gap-3  outline-none  p-3 w-full rounded-md mb-2">
              <FaUserPen className="text-xl  text-slate-600 " />
              <input
                type="text"
                name="username"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
                className=" bg-transparent placeholder:text-indigo-500 text-indigo-500 text-md placeholder:text-sm outline-none "
              />
            </div>
            <div className="bg-slate-100 flex items-center gap-3  outline-none  p-3 w-full rounded-md mb-2">
              <IoMail className="text-xl  text-slate-600 " />

              <input
                type="email"
                name="email"
                value={email}
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                required
                className=" bg-transparent placeholder:text-indigo-500 text-indigo-500 text-md placeholder:text-sm outline-none "
              />
            </div>
            <div className="bg-slate-100 flex items-center gap-3  outline-none  p-3 w-full rounded-md mb-2">
              <IoIosUnlock className="text-xl  text-slate-600 " />
              <input
                type="password"
                name="password"
                value={password}
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                required
                className=" bg-transparent placeholder:text-indigo-500 text-indigo-500 text-md placeholder:text-sm outline-none "
              />
            </div>
            <div className="bg-slate-100 flex items-center gap-3  outline-none  p-3 w-full rounded-md mb-2">
              <IoIosLock className="text-xl  text-slate-600 " />
              <input
                type="password"
                name="password"
                value={confpassword}
                placeholder="Enter confirm password"
                onChange={(e) => setconfPassword(e.target.value)}
                className=" bg-transparent placeholder:text-indigo-500 text-indigo-500 text-md placeholder:text-sm outline-none "
                required
              />
            </div>
            <button
              type="submit"
              className="py-2 px-4 rounded-md bg-indigo-100 font-semibold  hover:bg-indigo-200 text-indigo-700 "
            >
              Submit
            </button>
            <span className="text-center">
              Already have an account?{" "}
              <Link className="text-indigo-700 font-semibold" to={"/login"}>
                Login
              </Link>
            </span>

            {/* <button onClick={notify}>Make me a toast</button> */}
            <Toaster />
          </form>
        </div>
      </div>
    </>
  );
}
