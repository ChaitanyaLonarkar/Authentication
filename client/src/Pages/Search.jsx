import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Logo from "../assets/logo.png";
import il1 from "../assets/il1c.png";
import tu from "../assets/illus.jpg";
import Loader from "../components/Loader";
import timeAgo, { Server } from "../context/TimeAgo";
import { useAuthContext } from "../context/AuthContext";

export default function Search() {
  const { authUser, setAuthUser } = useAuthContext();

  const navigate = useNavigate();
  const [allBlogs, setallBlogs] = useState([]);
  const { search } = useLocation();
  // console.log(search);
  const [noResult, setnoResult] = useState(false);
  const [loader, setloader] = useState(false);
  const url = Server+"public/Images/";

  const fetchSearchBlogs = async () => {
    setloader(true);
    try {
      const res = await axios.get(
        Server+"post/getSearchPosts" + search
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


      <div className="blog-section max-[450px]:m-2 m-5 bg-white rounded-xl max-[500px]:px-0  max-[500px]:p-0  max-[500px]:py-8  p-12 px-20 gap-12  flex flex-col justify-around items-center">
        <div className="heading font-extrabold max-[500px]:text-xl text-3xl md:text-5xl  flex flex-col items-center text-indigo-900 opacity-95">
          Searched Blogs
          <div className="  max-[500px]:mt-2 h-1 bg-indigo-400 rounded w-3/4 justify-self-center mt-4"></div>
        </div>

        {loader ? (
          <div className="mx-auto my-12 text-center">
            <Loader />
          </div>
        ) : (
          noResult?  <div className="blog-section m-5 bg-white rounded-xl flex flex-col justify-around items-center">
          <div className=" max-[500px]:text-base w-full text-2xl font-semibold text-indigo-900 opacity-90">
            No Result Found
          </div>
        </div>:
          <div className="latestblogs flex flex-col-reverse max-[600px]:gap-4 gap-8 max-[1024px]:items-center ">
            {allBlogs.map((blog) => (
              <div className="  l-blog flex flex-col  max-[1024px]:w-[100%] lg:flex-row gap-5 max-[450px]:w-80 lg:gap-12 lg:even:flex-row-reverse border bg-indigo-50 rounded max-[600px]:p-[1.2rem] p-[2rem] items-center  ">
                <div className=" w-2/4 max-[1024px]:w-[100%] rounded overflow-hidden   ">
                  {/* <img src={tu} alt="" /> */}
                  <img
                    src={url + blog.thumbnail}
                    alt="Thumbnail"
                    className="max-[600px]:h-full w-full h-[27rem] object-cover"
                  />
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
                      key={blog._id}
                      // to={authUser ? `/bloginfo/${blog._id}` : "/login"}
                      to={`/bloginfo/${blog._id}`}
                    >
                      {/* <Link key={blog._id} to={`/bloginfo/${blog._id}`}> */}
                      {blog.title}
                    </Link>
                  </div>
                  <div className="max-[600px]:text-sm text-slate-700 text-lg overflow-hidden ">
                    {/* {blog.desc.slice(0, 200)}... */}
                    <div className=" w-[100%]"   dangerouslySetInnerHTML={{ __html: blog.desc.slice(0,300) +"......"}} />
                    <Link
                      key={blog._id}
                      to={`/bloginfo/${blog._id}`}
                      className="max-[600px]:text-sm text-base text-sky-700"
                    >
                      Read More
                    </Link>
                  </div>
                  <div key={blog.userId}className="max-[600px]:text-[10px]">
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
        )}
      </div>
    </>
  );
}
