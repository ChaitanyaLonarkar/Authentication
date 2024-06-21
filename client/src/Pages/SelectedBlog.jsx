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

export default function SelectedBlog() {
  const [isLiked, setisLiked] = useState(false);
  const [commnetKaru, setcommentKaru] = useState();
  const blogId = useParams().id;
  const [blog, setblog] = useState({});
  const { authUser } = useAuthContext();
  const [comment, setcomment] = useState("");
  const [comments, setcomments] = useState([]);

  const navigate = useNavigate();

  const url = "http://localhost:8000/public/Images/";

  const fetchBlogInfo = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/post/getpost/" + blogId
      );
      // console.log(res.data.oneBlog)
      setblog(res.data.oneBlog);
      // console.log(blog)
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePost = async () => {
    try {
      const res = await axios.delete(
        "http://localhost:8000/post/delete/" + blogId,
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
        "http://localhost:8000/comment/post/" + blogId
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
        "http://localhost:8000/comment/create",
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
        "http://localhost:8000/comment/delete/" + id,
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
        <div className="md:w-[50rem] max-[400px]:w-[95%]  bg-white p-3 min-[401px]:p-7 md:p-12 flex flex-col gap-6 sm:gap-10 rounded-lg">
          <div className="b-heading  max-[400px]:text-[28px] min-[401px]:text-3xl md:text-5xl font-bold text-indigo-900 ">
            {blog.title}
          </div>

          <div className="flex gap-5 text-sm  font-medium text-indigo-900">
            {blog.categories?.map((c) => (
              <div className=" bg-slate-200 p-1 px-3 rounded-2xl ">{c}</div>
            ))}
          </div>
          <div className="blogger-details flex gap-3 items-center justify-between text-slate-700 border-t-2  border-b-2 p-2  sm:p-4">
            <div className="flex gap-3 items-center max-[500px]:text-sm">
              <div className="w-16 ">
                <img src={person} alt="" />
              </div>
              <div className="">
                {blog.username}
                <br />
                <span className=" max-[400px]:text-xs text-sm text-slate-500">
                  {timeAgo(blog.updatedAt)}
                </span>
              </div>
            </div>
            <div className="flex  scale-90 gap-4 min-[500px]:gap-8 min-[500px]:scale-100">
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
              <a
                href="#comment-karu"
                className=" scroll-smooth"
                onClick={() => {
                  authUser ? setcommentKaru(true) : navigate("/login");
                }}
              >
                <FaRegCommentDots className="text-2xl text-slate-600 hover:text-slate-500 cursor-pointer" />
              </a>
              <FaShare className="text-2xl text-slate-600 hover:text-slate-500 cursor-pointer" />
            </div>
            {authUser?._id === blog?.userId && (
              <div className="flex items-center justify-center space-x-2">
                <p
                  className="cursor-pointer text-3xl text-slate-600 hover:text-slate-700"
                  onClick={() => navigate("/updateBlog/" + blogId)}
                >
                  <abbr title="Update Blog" >
                    <GrDocumentUpdate className="text-2xl"/>
                  </abbr>

                  {/* <BiEdit /> */}
                </p>
                <p
                  className="cursor-pointer text-3xl text-slate-600 hover:text-slate-700"
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
              <img src={url + blog.thumbnail} alt="thumbnail" />
            </div>
            <div className="text-justify max-[550px]:text-sm  ">
              <pre className="w-[100%] overflow-hidden">{blog.desc}</pre>
            </div>
          </div>
          <div className="flex gap-8">
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
                <div className="font-semibold text-slate-600">Add Comment</div>

                {commnetKaru && (
                  <div
                    onClick={() => setcommentKaru(false)}
                    className=" cursor-pointer "
                  >
                    <IoCloseSharp className="text-2xl" />
                  </div>
                )}
              </div>
              <div className="m-5 w-full rounded ">
                <input
                  type="text"
                  placeholder="write here.. "
                  className="p-3 text-sm w-3/4 outline-none"
                  onChange={(e) => setcomment(e.target.value)}
                />
                <button
                  className="p-3 bg-indigo-500 text-white text-sm hover:bg-indigo-600 rounded-sm  "
                  onClick={postBlogComment}
                >
                  Add Comment
                </button>
              </div>
            </div>
          )}
          <div className="comment-section  w-full bg-slate-100 p-3 rounded  ">
            <div className="font-semibold text-slate-600">All Comments</div>

            {comments.length === 0 ? (
              <div className=" text-slate-700 text-sm p-4">
                No comments in this post
              </div>
            ) : (
              comments.map((cm) => (
                <div className="text-sm m-3 flex flex-col gap-2 bg-white px-5 py-3 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="text-xs">
                      <b className="text-lg text-indigo-900 pe-4">
                        @{cm.autherId}
                      </b>
                      {timeAgo(cm.updatedAt)}
                    </div>
                    {authUser._id === cm.userId ? (
                      <div className="flex text-xl gap-4 text-slate-700 cursor-pointer">
                        {/* <BiEdit /> */}
                        <MdDelete onClick={() => deleteBlogComments(cm._id)} />
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="text-base text-indigo-600">{cm.comment}</div>
                  {/* <div>{timeAgo(cm.updatedAt)}</div> */}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
