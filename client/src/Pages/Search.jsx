import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Logo from "../assets/logo.png";
import il1 from "../assets/il1c.png";
import tu from "../assets/illus.jpg";
import Loader from "../components/Loader"
import timeAgo from "../context/TimeAgo";

export default function Search() {
  const navigate = useNavigate();
  const [allBlogs, setallBlogs] = useState([]);
  const { search } = useLocation();
  // console.log(search);
  const [noResult, setnoResult] = useState(false);
  const [loader, setloader] = useState(false);
  const url="http://localhost:8000/public/Images/"

  const fetchSearchBlogs = async () => {
    setloader(true);
    try {
      const res = await axios.get(
        "http://localhost:8000/post/getSearchPosts" + search
      );
      // console.log(res.data.posts,);
      setallBlogs(res.data.posts);
      if (res.data.posts == 0) setnoResult(true);
      else setnoResult(false);
      setloader(false);

      // console.log(allBlogs, "dfdfdfdfdfdfdfdfd");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // verifyUser();
    fetchSearchBlogs();
  }, [search]);



  return (
    <>
      {loader?<div className="mx-auto my-12 text-center"><Loader/></div>:!noResult ? (
        <div className="blog-section m-5 bg-white rounded-xl p-12 px-20 gap-12  flex flex-col justify-around items-center">
          <div className="heading font-bold text-4xl flex flex-col items-center text-indigo-900 opacity-95">
            Searched Blogs
            <div className="h-1 bg-indigo-400 rounded w-3/4 justify-self-center mt-4"></div>
          </div>

          <div className="latestblogs  ">
            {allBlogs.map((blog) => (
              <div className="l-blog flex gap-12  ">
                <div className=" w-2/4 rounded-xl overflow-hidden  ">
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
                    <Link key={blog._id} to="/b">
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
      ) : (
        <div className="blog-section m-5 bg-white rounded-xl p-12 px-20 gap-12  flex flex-col justify-around items-center">
          <div className="text-2xl font-semibold text-indigo-900 opacity-90">
            No Result Found
          </div>
        </div>
      )}
    </>
  );
}
