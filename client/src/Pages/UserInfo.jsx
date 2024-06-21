import React, { useEffect, useState } from "react";
import { Link, useNavigate,useParams } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Logo from "../assets/logo.png";
import il1 from "../assets/il1c.png";
import tu from "../assets/illus.jpg";
import { useAuthContext } from "../context/AuthContext";
import timeAgo from "../context/TimeAgo";

export default function Profile() {
  const { authUser } = useAuthContext();
  const [usersPosts, setusersPosts] = useState([]);
  const [user, setuser] = useState([]);
  const url = "http://localhost:8000/public/Images/";

  const userId = useParams().id;
  
  const fetchUser = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/user/getuser/" + userId,
        { withCredentials: true }
      );
      console.log(res.data);
      setuser(res.data.getUser);
      // setusersPosts(res.data.getUser.myblogs)
      // console.log(usersPosts)
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUsersPost = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/post/getpostofuser/" + userId,
        { withCredentials: true }
      );
      // console.log(res.data.oneBlogOfUser);
      setusersPosts(res.data.oneBlogOfUser);
      // console.log(usersPosts)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsersPost();

    fetchUser();
  }, []);

  return (
    <>
      <div className="flex justify-center my-4  items-center ">
        <div className=" md:w-[80rem] max-[500px]:w-[95%]  bg-white p-3 min-[501px]:w-[87%] min-[401px]:p-7 md:p-12 flex  max-[900px]:flex-col-reverse  gap-8 sm:gap-10 rounded-lg">
          <div className=" w-2/3 border-r-2 max-[900px]:border-0 max-[900px]:w-[100%]">
            <div className="font-bold max-[400px]:text-xl text-center sm:text-start text-2xl  text-indigo-950 opacity-95">
            User Blogs
            </div>

            <div>
              <div className="blog-section max-[640px]:w-[100%] ms-0 m-5  rounded-xl gap-12  max-[900px]:mt-5 max-[900px]:m-0 flex flex-col justify-around items-center">
                <div className="latestblogs max-[640px]:w-[100%] flex flex-col  gap-12 max-[640px]:gap-7 ">
                 
                  {usersPosts.map((blog) => (
                    <div className="l-blog bg-indigo-50 p-5 max-[900px]:w-[100%]">
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
                        <div className="font-bold text-4xl max-[640px]:text-2xl   text-indigo-900 opacity-95">
                          <Link to="">{blog.title}</Link>
                        </div>
                        <div className="text-slate-700 text-lg max-[640px]:text-base overflow-hidden">
                          {blog.desc.slice(0, 200)}...
                          <Link to="" className=" text-base text-sky-700">
                            Read More
                          </Link>
                        </div>
                        <div className="max-[640px]:text-sm ">
                          by <Link  className="text-xl max-[640px]:text-base  text-indigo-800 font-semibold" to="">{blog.username}</Link> {timeAgo(blog.updatedAt)}
                        </div>
                      </div>
                    </div>

                   
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="w-[35%] flex flex-col gap-8  max-[900px]:w-[100%] ">
            <div className="font-bold max-[400px]:text-xl text-center sm:text-start text-2xl  text-indigo-950 opacity-95">
              User Profile
            </div>

            <div className="text-lg font-medium flex flex-col max-[900px]:border-b-2 max-[900px]:pb-9  gap-5">
              <div className="w-[200px] rounded-lg overflow-hidden ">

                {user.profilePic==""?
                <img
                src="https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                alt="Profile"
                className=" w-40 h-40 object-cover rounded-lg"
                />:
                <img
                src={url+user.profilePic}
                alt="Profile"
                 className=" w-40 h-40 object-cover rounded-lg"
                />
              }

              </div>
              <div className="text-base"> <b>UserName :</b> {user.name}</div>
              <div className="text-base"> <b>Email :</b> {user.email}</div>
            
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
