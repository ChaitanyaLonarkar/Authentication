import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Logo from "../assets/logo.png";
import il1 from "../assets/il1c.png";
import tu from "../assets/illus.jpg";
import { useAuthContext } from "../context/AuthContext";
import timeAgo from "../context/TimeAgo";
export default function Home() {
  const navigate = useNavigate();
  const [allBlogs, setallBlogs] = useState([]);
  const { authUser, setAuthUser } = useAuthContext();
  const url="http://localhost:8000/public/Images/"

  // const verifyUser = async (e) => {
  //   try {
  //     const response = await axios.get("http://localhost:8000/", {
  //       withCredentials: true,
  //     }); // Make sure the URL is correct
  //     console.log(response.data)
  //     //  setAuthUser(response.data.user)
  //     // if (localStorage.getItem("user")) {
  //       // if (response.data.status) {
  //       toast.success(response.data.message || "User verified successfully");

  //       navigate("/");
  //     // } else {
  //     //   navigate("/login");
  //     // }
  //   } catch (error) {
  //     const errorMessage = error.response?.data?.error || "An error occurred";
  //     toast.error(errorMessage);
  //   }
  // };

  const { search } = useLocation();
  // console.log(search);
  // const user=JSON.parse(localStorage.getItem("user"))
  // console.log(user.name);

  
  
  const fetchAllBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:8000/post/getAllPosts");

      // console.log(res.data.allblogs);
      setallBlogs(res.data.allblogs);
      // console.log(allBlogs, "dfdfdfdfdfdfdfdfd");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // verifyUser();
    fetchAllBlogs();
  }, []);


  return (
   
    <>
      <div className="home md:m-5 m-2 p-4 py-8 bg-white rounded-xl md:p-12 md:px-15  flex justify-around items-center flex-col-reverse sm:flex-row  ">
        <div className="h-l flex flex-col max-[636px]:gap-5  gap-12">
          <div className="h-text max-[636px]:text-center flex flex-col md:gap-5">
            <div className="mb-4 font-medium text-indigo-900 text-xs sm:text-sm lg:text-lg opacity-75  ">
              {/* <img src={Logo} alt="Logo" /> */}
              Dive into Knowledge, Explore the World
            </div>
            <h1 className=" font-extrabold  spacing max-[400px]:text-2xl text-4xl xl:text-6xl md:text-5xl sm:text-3xl text-indigo-400 ">
              Inspire. Learn. Share.
            </h1>
            <h1 className=" font-extrabold  spacing max-[400px]:text-xl text-2xl xl:text-5xl md:text-3xl sm:text-2xl text-indigo-900 opacity-95 mt-5  leading-relaxed ">
              A Blogs for Passionate People. <br />
              {/* Your Journey Starts Here. */}
            </h1>
          </div>
          <div className="join max-[636px]:flex max-[636px]:justify-center ">
            <Link
              to="/login"
              className="max-[636px]:p-2 max-[636px]:text-sm p-4 rounded-md bg-indigo-100 font-bold  hover:bg-indigo-200 text-indigo-700 "
            >
              {" "}
              Join Us Today
            </Link>
          </div>
        </div>
        <div className="h-r  w-72 sm:w-2/4 sm:mb-0 mb-10">
          <div className="illus">
            <img src={il1} alt="illustration" />
          </div>
        </div>
      </div>

      <div className="blog-section m-5 bg-white rounded-xl p-12 px-20 gap-12  flex flex-col justify-around items-center">
        <div className="heading font-extrabold text-5xl flex flex-col items-center text-indigo-900 opacity-95">
          Latest Blogs
          <div className="h-1 bg-indigo-400 rounded w-3/4 justify-self-center mt-4"></div>
        </div>

        <div className="latestblogs flex flex-col-reverse gap-8 ">
          {allBlogs.map((blog) => (
            <div className="l-blog flex gap-12 even:flex-row-reverse border bg-slate-200 p-[2rem] items-center ">
              <div className=" w-2/4 .w-[41rem] rounded-xl overflow-hidden  ">
                {/* <img src={tu} alt="" /> */}
                <img src={url+blog.thumbnail} alt="Thumbnail" />

              </div>
              <div className="w-2/4 flex flex-col  justify-center gap-7">
                <div className="text-indigo-900 font-medium opacity-95 text-xl">
                  {blog.categories.map((c) => (
                    <div>{c}</div>
                  ))}
                </div>
                <div className="font-bold text-4xl  text-indigo-900 opacity-95">
                  <Link key={blog._id} to={authUser?`/bloginfo/${blog._id}`:"/login"}>
                  {/* <Link key={blog._id} to={`/bloginfo/${blog._id}`}> */}
                    {blog.title}
                  </Link>
                </div>
                <div className="text-slate-700 text-lg ">
                  {blog.desc.slice(0, 200)}...
                  <Link
                    key={blog._id}
                    to="/b"
                    className=" text-base text-sky-700"
                  >
                    Read More
                  </Link>
                </div>
                <div key={blog.userId}>
                  by {blog.username} {timeAgo(blog.updatedAt)}
                  {/* ,{new Date(blog.updatedAt).toString().slice(0,15)} {convertTo12Hour((new Date(blog.updatedAt).toString().slice(16,24)))} */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
