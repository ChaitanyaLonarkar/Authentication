import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Logo from "../assets/logo.png";
import il1 from "../assets/il1c.png";
import tu from "../assets/illus.jpg";
import { useAuthContext } from "../context/AuthContext";
import timeAgo from "../context/TimeAgo";
import Cookies from "js-cookie";

export default function Profile() {
  const { authUser, setAuthUser } = useAuthContext();
  const navigate = useNavigate();
  const [usersPosts, setusersPosts] = useState([]);
  const url = "http://localhost:8000/public/Images/";

  const fetchUsersPost = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/post/getpostofuser/" + authUser._id,
        { withCredentials: true }
      );
      // console.log(res.data.oneBlogOfUser);
      setusersPosts(res.data.oneBlogOfUser);
      // console.log(usersPosts)
    } catch (err) {
      console.log(err);
    }
  };
  const username = Cookies.get("token");
  // console.log(username); //

  useEffect(() => {
    fetchUsersPost();
  }, []);

  const delUser = async () => {
    try {
      const res = await axios.delete(
        "http://localhost:8000/user/delete/" + authUser._id,
        { withCredentials: true }
      );
      // console.log(res.data)
      localStorage.removeItem("user");
      setAuthUser(null);
      Cookies.remove("token");
      navigate("/login");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <div className="flex justify-center my-4  items-center ">
        <div className=" md:w-[80rem] max-[400px]:w-[95%]  bg-white p-3 min-[501px]:w-[87%] min-[401px]:p-7 md:p-12 flex  gap-8 sm:gap-10 rounded-lg">
          <div className=" w-2/3 border-r-2">
            <div className="font-bold max-[400px]:text-xl text-center sm:text-start text-2xl  text-indigo-950 opacity-95">
              My Blogs
            </div>

            <div>
              <div className="blog-section m-5 bg-white rounded-xl pr-8 gap-12  flex flex-col justify-around items-center">
                <div className="latestblogs flex flex-col gap-12 ">
                  {usersPosts.length === 0 && (
                    <div>There is no blogs you posted</div>
                  )}
                  {usersPosts.map((blog) => (
                    <div className="l-blog">
                      <div className="  rounded-xl overflow-hidden  ">
                        {/* <img src={tu} alt="" /> */}
                        <img src={url + blog.thumbnail} alt="thumbnail" />
                      </div>
                      <div className=" flex flex-col  justify-center gap-4 mt-10">
                        {blog.categories.map((cat) => {
                          <div className="text-indigo-900 font-medium opacity-95 text-xl">
                            {cat}
                          </div>;
                        })}
                        <div className="font-bold text-4xl  text-indigo-900 opacity-95">
                          <Link
                            key={blog._id}
                            // to={authUser ? `/bloginfo/${blog._id}` : "/login"}
                            to={`/bloginfo/${blog._id}`}
                          >
                            {blog.title}
                          </Link>
                        </div>
                        <div className="text-slate-700 text-lg">
                          {blog.desc.slice(0, 200)}
                          <Link to="" className=" text-base text-sky-700">
                            Read More
                          </Link>
                        </div>
                        <div>
                          by{" "}
                          <Link
                            className="text-xl text-indigo-800 font-semibold"
                            to="/"
                          >
                            {blog.username}
                          </Link>{" "}
                          {timeAgo(blog.updatedAt)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="w-[35%] flex flex-col gap-8  ">
            <div className="font-bold max-[400px]:text-xl text-center sm:text-start text-2xl  text-indigo-950 opacity-95">
              My Profile
            </div>

            <div className="text-lg font-medium flex flex-col gap-5">
              <div className=" rounded-lg overflow-hidden ">
                {/* <img
                  src="https://avatars.githubusercontent.com/u/110454138?v=4"
                  alt=""
                /> */}
                <img
                  src={url + authUser.profilePic}
                  alt="profile"
                  className=" w-40 h-40 object-cover rounded-lg"
                />
              </div>
              <div className="text-base">
                <b>UserName :</b> {authUser.name}
              </div>
              <div className="text-base">
                <b>Email :</b> {authUser.email}
              </div>
              <div className=" cursor-pointer   hover:bg-slate-400  p-2 bg-slate-300 w-[max-content] rounded text-base  px-3">
                <Link to={`/profileUpdate/${authUser._id}`}>
                  Update Profile
                </Link>
              </div>
              <div
                className=" cursor-pointer  hover:bg-slate-400  p-2 bg-slate-300 w-[max-content] rounded text-base  px-3"
                onClick={delUser}
              >
                Delete Profile
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
