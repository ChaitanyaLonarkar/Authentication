import React, { useEffect } from "react";
import person from "../assets/ppp.jpg";
import { FcLike } from "react-icons/fc";
import { GoHeartFill } from "react-icons/go";
import { FaRegCommentDots } from "react-icons/fa";
import { useState } from "react";
import { FcLikePlaceholder } from "react-icons/fc";
import { FaShare } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import timeAgo from "../context/TimeAgo";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useAuthContext } from "../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import { GrDocumentUpdate } from "react-icons/gr";
import Loader from "../components/Loader"
import { Server } from "../context/TimeAgo";
export default function SelectedBlog() {
  const [isLiked, setisLiked] = useState(false);
  const [commnetKaru, setcommentKaru] = useState();
  const blogId = useParams().id;
  const [blog, setblog] = useState({});
  const { authUser } = useAuthContext();
  const [comment, setcomment] = useState("");
  const [comments, setcomments] = useState([]);
  const [loader, setloader] = useState(false);

  const navigate = useNavigate();

  const url = Server+"public/Images/";

  const fetchBlogInfo = async () => {
    setloader(true);

    try {
      const res = await axios.get(
        Server+"post/getpost/" + blogId
      );
      // console.log(res.data.oneBlog)
      setblog(res.data.oneBlog);
      setloader(false);

      // console.log(blog)
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePost = async () => {
    try {
      const res = await axios.delete(
        Server+"post/delete/" + blogId,
        { withCredentials: true }
      );
      // console.log(res.data)
      if (res.data.sucess) {
        toast.success(res.data.message);
        // window.location.reload(true)

        navigate("/");
      } else {
        toast.error(res.data.message);
      }
      // console.log(blog)
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBlogComments = async () => {
    try {
      const res = await axios.get(
        Server+"comment/post/" + blogId
      );
      // console.log(res.data)
      setcomments(res.data.comments);
    } catch (error) {
      console.log(error);
    }
  };

  const postBlogComment = async () => {
    try {
      const res = await axios.post(
        Server+"comment/create",
        {
          comment: comment,
          autherId: authUser.name,
          userId: authUser._id,
          postId: blogId,
        },
        { withCredentials: true }
      );
      if (res.data.sucess) {
        toast.success(res.data.message);
        setcomment("");
        window.location.reload(true);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlogInfo();
    fetchBlogComments();
  }, [blogId]);

  const deleteBlogComments = async (id) => {
    try {
      const res = await axios.delete(
        Server+"comment/delete/" + id,
        { withCredentials: true }
      );
      // toast.message(res.data.message)
      window.location.reload(true);
      // setcomments(res.data.comments);
    } catch (error) {
      toast.error(error);
    }
  };

  //  console.log(blogId)
  return (
    <>
      <div className="flex justify-center my-4  items-center ">
      {loader?<div className="mx-auto my-12 text-center"><Loader/></div>:<div className="md:w-[50rem]   bg-white p-3 min-[401px]:p-7 max-[766px]:w-[95%]  md:p-12 flex flex-col gap-6 sm:gap-10 rounded-lg">
          <div className="b-heading  max-[400px]:text-[28px] min-[401px]:text-3xl md:text-5xl font-bold text-indigo-900 ">
            {blog.title}
          </div>

          <div className="flex gap-5 text-sm  font-medium text-indigo-900">
            {blog.categories?.map((c) => (
              <div className=" bg-slate-200 p-1 px-3 rounded-2xl ">{c}</div>
            ))}
          </div>
          <div className="blogger-details flex gap-3 items-center justify-between text-slate-700 border-t-2  border-b-2 p-2  sm:p-4">
            <div className="flex max-[400px]:gap-1 gap-3 items-center max-[500px]:text-sm">
              <div className="w-16 ">
                <img src={person} alt="" />
              </div>
              <div className="max-[400px]:text-[13px]">
                {blog.username}
                <br />
                <span className=" max-[400px]:text-[10px] text-sm text-slate-500">
                  {timeAgo(blog.updatedAt)}
                </span>
              </div>
            </div>
            <div className="flex  scale-90 gap-4 min-[500px]:gap-8 min-[500px]:scale-100">
              {isLiked ? (
                <FcLike
                  className="max-[506px]:text-lg text-2xl cursor-pointer"
                  onClick={() => {
                    setisLiked(false);
                  }}
                />
              ) : (
                <FcLikePlaceholder
                  className="max-[506px]:text-lg text-2xl  cursor-pointer hover:text-slate-600"
                  onClick={() => {
                    setisLiked(true);
                  }}
                />
                // <GoHeartFill  />
              )}
              <a
                href="#comment-karu"
                className=" scroll-smooth"
                onClick={() => {
                  authUser ? setcommentKaru(true) : navigate("/login");
                }}
              >
                <FaRegCommentDots className="max-[506px]:text-lg text-2xl text-slate-600 hover:text-slate-500 cursor-pointer" />
              </a>
              <FaShare className="max-[506px]:text-lg text-2xl text-slate-600 hover:text-slate-500 cursor-pointer" />
            </div>
            {authUser?._id === blog?.userId && (
              <div className="flex items-center justify-center space-x-2">
                <p
                  className="cursor-pointer text-3xl text-slate-600 hover:text-slate-700"
                  onClick={() => navigate("/updateBlog/" + blogId)}
                >
                  <abbr title="Update Blog" >
                    <GrDocumentUpdate className="max-[506px]:text-base text-2xl"/>
                  </abbr>

                  {/* <BiEdit /> */}
                </p>
                <p
                  className="cursor-pointer max-[506px]:text-lg text-3xl text-slate-600 hover:text-slate-700"
                  onClick={handleDeletePost}
                >
                  <abbr title="Delete Blog">
                    <MdDelete />
                  </abbr>
                </p>
              </div>
            )}
          </div>

          <div className="blog-content flex flex-col gap-10">
            <div>
              {/* <img
                src="https://miro.medium.com/v2/resize:fit:828/format:webp/1*CC1ML6NyDUAWSLdRJLFsMg.jpeg"
                alt=""
              /> */}
              <img src={url + blog.thumbnail} alt="thumbnail" className="w-full min-[566px]:h-[25rem] min-[566px]:object-cover"/>
            </div>
            <div className="text-justify max-[550px]:text-sm  ">
              <pre className="max-[666px]:text-sm w-[100%] overflow-hidden">{blog.desc}</pre>
            </div>
          </div>
          <div className="flex gap-8  max-[500px]:scale-90  max-[500px]:gap-4">
            {isLiked ? (
              <FcLike
                className="text-2xl cursor-pointer"
                onClick={() => {
                  setisLiked(false);
                }}
              />
            ) : (
              <FcLikePlaceholder
                className="text-2xl  cursor-pointer hover:text-slate-600"
                onClick={() => {
                  setisLiked(true);
                }}
              />
              // <GoHeartFill  />
            )}
            <FaRegCommentDots
              className="text-2xl text-slate-600 hover:text-slate-500 cursor-pointer"
              onClick={() => {
                authUser ? setcommentKaru(true) : navigate("/login");
              }}
            />
            <FaShare className="text-2xl text-slate-600 hover:text-slate-500 cursor-pointer" />
          </div>

          {commnetKaru && (
            <div
              id="comment-karu"
              className="comment-karu w-full bg-slate-100 p-3 rounded  "
            >
              <div className="flex justify-between px-3">
                <div className=" max-[666px]:text-sm font-semibold text-slate-600">Add Comment</div>

                {commnetKaru && (
                  <div
                    onClick={() => setcommentKaru(false)}
                    className=" cursor-pointer "
                  >
                    <IoCloseSharp className="text-2xl max-[666px]:text-base" />
                  </div>
                )}
              </div>
              <div className=" max-[666px]:mt-2 max-[666px]:m-0 m-5 w-full rounded ">
                <input
                  type="text"
                  placeholder="write here.. "
                  className="p-3 text-sm w-3/4 max-[666px]:w-[100%] max-[506px]:p-2 max-[666px]:mb-2 outline-none"
                  onChange={(e) => setcomment(e.target.value)}
                />
                <button
                  className="p-3 bg-indigo-500 text-white max-[506px]:text-xs text-sm max-[506px]:p-2 hover:bg-indigo-600 rounded-sm  "
                  onClick={postBlogComment}
                >
                  Add Comment
                </button>
              </div>
            </div>
          )}
          <div className="comment-section  w-full bg-slate-100 p-3 rounded  ">
            <div className="font-semibold text-slate-600  max-[666px]:text-sm">All Comments</div>

            {comments.length === 0 ? (
              <div className=" text-slate-700 text-sm p-4">
                No comments in this post
              </div>
            ) : (
              comments.map((cm) => (
                <div className=" max-[506px]:mt-2 max-[506px]:m-0 max-[506px]:text-xs text-sm m-3 flex flex-col gap-2 bg-white px-5 py-3 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="text-xs">
                      <b className="max-[506px]:text-sm text-lg text-indigo-900 pe-4">
                        @{cm.autherId}
                      </b>
                      {timeAgo(cm.updatedAt)}
                    </div>
                    {authUser._id === cm.userId ? (
                      <div className="flex max-[506px]:text-base  text-xl gap-4 text-slate-700 cursor-pointer">
                        {/* <BiEdit /> */}
                        <MdDelete onClick={() => deleteBlogComments(cm._id)} />
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="text-base max-[506px]:text-xs text-indigo-600">{cm.comment}</div>
                  {/* <div>{timeAgo(cm.updatedAt)}</div> */}
                </div>
              ))
            )}
          </div>
        </div>}
      </div>
    </>
  );
}
