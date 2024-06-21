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
  const url = "http://localhost:8000/public/Images/";

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
            {!authUser?<Link
              to="/login"
              className="max-[636px]:p-2 max-[636px]:text-sm p-3 rounded-md bg-indigo-100 font-semibold  hover:bg-indigo-200 text-indigo-700 "
            >
              {" "}
              Join Us Today
            </Link>
            :
            <Link
              to="/createBlog"
              className="max-[636px]:p-2 max-[636px]:text-sm p-3 rounded-md bg-indigo-100 font-semibold  hover:bg-indigo-200 text-indigo-700 "
            >
              
              Write a blog
            </Link>}
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
            <div className="l-blog flex gap-12 even:flex-row-reverse border bg-indigo-50 rounded p-[2rem] items-center ">
              <div className=" w-2/4 .w-[41rem] rounded overflow-hidden  ">
                {/* <img src={tu} alt="" /> */}
                <img src={url + blog.thumbnail} alt="Thumbnail" className="w-full h-[27rem] object-cover" />
              </div>
              <div className="w-2/4 flex flex-col  justify-center gap-7">
                <div className="text-indigo-900 flex gap-2 flex-wrap font-medium opacity-95 ">
                  {blog.categories?.map((c) => (
                    <div className=" bg-white w-[max-content] p-1 px-3 rounded-xl ">
                      {c}
                    </div>
                  ))}
                </div>
                <div className="font-bold text-4xl  text-indigo-900 opacity-95">
                  <Link
                    key={blog._id}
                    // to={authUser ? `/bloginfo/${blog._id}` : "/login"}
                    to={`/bloginfo/${blog._id}`}
                  >
                    {/* <Link key={blog._id} to={`/bloginfo/${blog._id}`}> */}
                    {blog.title}
                  </Link>
                </div>
                <div className="text-slate-700 text-lg overflow-hidden ">
                  {blog.desc.slice(0, 200)}...
                  <Link
                    key={blog._id}
                    to={`/bloginfo/${blog._id}`}
                    className=" text-base text-sky-700"
                  >
                    Read More
                  </Link>
                </div>
                <div key={blog.userId}>
                  by 
                  <Link
                    className="text-lg ps-2 text-indigo-800 font-semibold pe-2"
                    to={
                      blog.userId === authUser?._id
                        ? "/myprofile"
                        : `/userinfo/${blog.userId}`
                    }
                  >
                     {blog.username}
                  </Link>
                  {timeAgo(blog.updatedAt)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
