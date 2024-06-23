import React from "react";
import { useState,useLocation } from "react";
import logo from "../assets/perfect1.png";
import person from "../assets/person.jpg";
import { IoMdCloseCircle } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { Outlet, Link, Navigate, useNavigate } from "react-router-dom";
import { TfiMenuAlt } from "react-icons/tfi";
import { LuPenSquare } from "react-icons/lu";
import Logout from "../Pages/Logout";
import { IoClose } from "react-icons/io5";
import { useAuthContext } from "../context/AuthContext";
import { Server } from "../context/TimeAgo";
// const path=useLocation().pathname

export default function Navbar() {
  const { authUser } = useAuthContext();
  const [loginUser, setLoginUser] = useState(true);
  const url = Server+"public/Images/";

  const [searchReasponsive, setSearchReasponsive] = useState(false);
  const [toggle, settoggle] = useState(false);
  const [prompt, setprompt] = useState("");

  // console.log(authUser)
  const navigate = useNavigate();
  // console.log(prompt);
  //  const onSearchReasponsive=()=>{
  //   set
  //  }

  return (
    <>
      <div className="nav flex justify-between bg-white  items-center w-full px-3 py-2 sm:px-20 sm:py-3 border-b ">
        <div className="nav-left flex gap-20 gap">
          <div className="logo w-24 sm:w-32  ">
            <Link to="/" className="flex items-end">
              <img src={logo} alt="logo" />
              <span className="text-violet-500 d font-medium ">Blogs</span>
            </Link>
          </div>
          <div className="nav-search hidden lg:flex items-center gap-4  overflow-hidden  bg-slate-100 rounded-lg h-10">
          <div className="bg-indigo-400 p-3">
              <IoSearch
                className="text-slate-900 text-lg cursor-pointer"
                onClick={() =>
                  navigate(prompt ? "/search" + "?search=" + prompt : "/")
                }
              />
            </div>

            <input
              type="search"
              className=" bg-transparent outline-none w-48 text-sm "
              placeholder="Search blog here"
              onChange={(e) => {
                setprompt(e.target.value);
              }}
            />
            {/* </Link>  */}
          </div>
        </div>
        <div className="nav-right flex max-[400px]:gap-1 gap-4 sm:gap-8 items-center">
          <div className="cursor-pointer flex lg:hidden hover:bg-slate-200  rounded p-1  ">
            {!searchReasponsive ? (
              <IoSearch
                className=" lg:hidden text-slate-800 text-2xl transition-all max-[400px]:scale-75"
                onClick={() => setSearchReasponsive(true)}
              />
            ) : (
              <IoClose
                className=" lg:hidden text-slate-800 text-2xl transition-all max-[400px]:scale-90"
                onClick={() => setSearchReasponsive(false)}
              />
            )}
          </div>

          
          <Link to={authUser ? ("/createBlog"):"/login"}>
            <abbr title="Write Blog">
              <LuPenSquare className="text-slate-800 text-xl-5 text-2xl max-[400px]:scale-75" />
            </abbr>
          </Link>

          {!authUser ? (
            <div className="btns hidden lg:flex gap-8">
              <Link
                className="py-2 px-4 rounded-md bg-indigo-100 font-bold  hover:bg-violet-200 text-indigo-700 "
                to="/login"
              >
                Login
              </Link>
              <Link
                className="py-2 px-4 rounded-md bg-indigo-100 font-bold  hover:bg-violet-200 text-indigo-700 "
                to="/signup"
              >
                SignUp
              </Link>
            </div>
          ) : (
            <div className="nav-profile hidden lg:flex gap-8 items-center">
              <div className="nav-user flex gap-1 items-center">
                <img
                  src={url + authUser.profilePic}
                  alt="pic"
                  className=" rounded-full w-8 h-8 object-cover"
                />

                {/* <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="user" className=" rounded-full w-8" /> */}
                <Link
                  to="/myprofile"
                  className="text-sm font-semibold text-indigo-800"
                >
                  {authUser.name}
                </Link>
              </div>
              <Logout />
            </div>
          )}
          <div className="flex lg:hidden bg-slate-50 hover:bg-slate-200  rounded p-1  cursor-pointer ">
            {!toggle ? (
              <TfiMenuAlt
                className=" text-slate-800 text-xl-5 text-2xl   rotate-180  max-[400px]:scale-75"
                onClick={() => settoggle(true)}
              />
            ) : (
              <IoMdCloseCircle
                className=" text-slate-800 text-xl-5 text-2xl max-[400px]:scale-90"
                onClick={() => settoggle(false)}
              />
            )}
          </div>
        </div>
      </div>
      {searchReasponsive && (
        <div className="responsive-search lg:hidden flex w-full justify-center bg-white">
          <div className="nav-search lg:hidden flex items-center gap-4 overflow-hidden m-5 w-3/4 bg-slate-200 rounded-lg h-10">
            <div className="bg-indigo-400 p-3">
              <IoSearch
                className="text-slate-900 text-lg cursor-pointer"
                onClick={() =>
                  navigate(prompt ? "/search" + "?search=" + prompt : navigate("/"))
                }
              />
            </div>
            

            <input
              type="search"
              className=" bg-transparent outline-none w-48 max-[400px]:w-3/4 "
              onChange={(e) => {
                setprompt(e.target.value);
              }}
            />
          </div>
        </div>
      )}
      {toggle && (
        <div className="responsive-search lg:hidden flex w-full justify-center bg-white">
          {!localStorage.getItem("user") ? (
            <div className="btns flex lg:hidden flex-col items-center mt-4 mb-4 gap-5 scale-90 ">
              <Link
                className="py-2 px-4 rounded-md bg-indigo-100 font-bold  hover:bg-violet-200 text-indigo-700 "
                to="/login"
              >
                Login
              </Link>
              <Link
                className="py-2 px-4 rounded-md bg-indigo-100 font-bold  hover:bg-violet-200 text-indigo-700 "
                to="/signup"
              >
                SignUp
              </Link>
            </div>
          ) : (
            <div className="nav-profile lg:hidden flex flex-col gap-5  items-center mt-4 mb-4  scale-90">
              <div className="nav-user flex gap-1 items-center">
                <img
                  src={url + authUser.profilePic}
                  alt="pic"
                  className=" rounded-full w-8 h-8 object-cover"
                />

                {/* <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="user" className=" rounded-full w-8" /> */}
                <Link
                  to="/myprofile"
                  className="text-sm font-semibold text-indigo-800"
                >
                  {authUser.name}
                </Link>
              </div>
              <Logout />
              {/* <Link
                className="py-2 px-4 rounded-md bg-indigo-100 font-bold  hover:bg-violet-200 text-indigo-700 "
                to="/logout"
              >
                Logout
              </Link> */}
            </div>
          )}
        </div>
      )}
    </>
  );
}
