import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Logo from "../assets/logo.png";
import il1 from "../assets/il1c.png";
import tu from "../assets/illus.jpg";
import { useAuthContext } from "../context/AuthContext";
import timeAgo from "../context/TimeAgo";
import Loader from "../components/Loader"

export default function Home() {
  const navigate = useNavigate();
  const [allBlogs, setallBlogs] = useState([]);
  const [loader, setloader] = useState(false);

  const { authUser, setAuthUser } = useAuthContext();
  const url = "https://blog-app-63z6.onrender.com/public/Images/";

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
 

  const fetchAllBlogs = async () => {
    setloader(true);

    try {
      const res = await axios.get("https://blog-app-63z6.onrender.com/post/getAllPosts");
      setallBlogs(res.data.allblogs);
      setloader(false);
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

      <div className="blog-section max-[450px]:m-2 m-5 bg-white rounded-xl p-12 px-20 gap-12  flex flex-col justify-around items-center">
        <div className="heading font-extrabold max-[500px]:text-xl text-3xl md:text-5xl  flex flex-col items-center text-indigo-900 opacity-95">
          Latest Blogs
          <div className="  max-[500px]:mt-2 h-1 bg-indigo-400 rounded w-3/4 justify-self-center mt-4"></div>
        </div>

        {loader?<div className="mx-auto my-12 text-center"><Loader/></div>:
        
        <div className="latestblogs flex flex-col-reverse max-[600px]:gap-4 gap-8 max-[1024px]:items-center ">
          {allBlogs.map((blog) => (
            <div className="  l-blog flex flex-col  max-[1024px]:w-[100%] lg:flex-row gap-5 max-[450px]:w-80 lg:gap-12 lg:even:flex-row-reverse border bg-indigo-50 rounded max-[600px]:p-[1.2rem] p-[2rem] items-center  ">
              <div className=" w-2/4 max-[1024px]:w-[100%] rounded overflow-hidden   ">
                {/* <img src={tu} alt="" /> */}
                <img src={url + blog.thumbnail} alt="Thumbnail" className="max-[600px]:h-full w-full h-[27rem] object-cover" />
              </div>
              <div className="w-2/4 max-[1024px]:w-[100%]  flex flex-col  justify-center gap-7">
                <div className="max-[600px]:text-sm text-indigo-900 flex gap-2 flex-wrap font-medium opacity-95 ">
                  {blog.categories?.map((c) => (
                    <div className=" bg-white w-[max-content] p-1 px-3 rounded-xl ">
                      {c}
                    </div>
                  ))}
                </div>
                <div className="max-[600px]:text-2xl font-bold text-4xl  text-indigo-900 opacity-95">
                  <Link
                  className="cap"
                    key={blog._id}
                    // to={authUser ? `/bloginfo/${blog._id}` : "/login"}
                    to={`/bloginfo/${blog._id}`}
                  >
                    {/* <Link key={blog._id} to={`/bloginfo/${blog._id}`}> */}
                    {blog.title}
                  </Link>
                </div>
                <div className= "max-[600px]:text-sm text-slate-700 text-lg overflow-hidden ">
                  {blog.desc.slice(0, 200)}...
                  <Link
                    key={blog._id}
                    to={`/bloginfo/${blog._id}`}
                    className="max-[600px]:text-sm text-base text-sky-700"
                  >
                    Read More
                  </Link>
                </div>
                <div key={blog.userId}>
                  by 
                  <Link
                    className=" max-[600px]:text-sm text-lg ps-2 text-indigo-800 font-semibold pe-2"
                    to={
                      blog.userId === authUser?._id
                        ? "/myprofile"
                        : `/userinfo/${blog.userId}`
                    }
                  >
                     @{blog.username}
                  </Link>
                  {timeAgo(blog.updatedAt)}
                </div>
              </div>
            </div>
          ))}
        </div>
}
      </div>
    </>
  );
}
