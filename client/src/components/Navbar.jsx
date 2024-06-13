import React from "react";
import { useState } from "react";
import logo from "../assets/perfect1.png";
import { IoSearch } from "react-icons/io5";
import { Outlet, Link } from "react-router-dom";

import { LuPenSquare } from "react-icons/lu";
export default function Navbar() {
  const [loginUser, setLoginUser] = useState(true);
  return (
    <>
      <div className="nav flex justify-between items-center w-full px-20 py-2 border-b ">
        <div className="nav-left flex gap-10">
          <div className="logo w w-32  ">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <div className="nav-search flex items-center gap-4 px-5  bg-slate-200 rounded-lg h-10">
            <IoSearch className="text-slate-700 text-lg" />

            <input
              type="search"
              className=" bg-transparent outline-none w-48 "
            />
          </div>
        </div>
        <div className="nav-right flex gap-8 items-center">
          <Link to="/createBlog">
            <abbr title="Write Blog">
              <LuPenSquare className="text-slate-800 text-xl-5 text-2xl" />
            </abbr>
          </Link>

          {loginUser ? (
            <div className="btns flex gap-8">
              <Link
                className="py-2 px-4 rounded bg-indigo-100 font-bold  hover:bg-violet-200 text-indigo-700 "
                to="/login"
              >
                Login
              </Link>
              <Link
                className="py-2 px-4 rounded bg-indigo-100 font-bold  hover:bg-violet-200 text-indigo-700 "
                to="/signup"
              >
                SignUp
              </Link>
            </div>
          ) : (
            <div className="nav-profile">
              {/* <img src="" alt="" /> */}
              <Link to="/profile">Username</Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
