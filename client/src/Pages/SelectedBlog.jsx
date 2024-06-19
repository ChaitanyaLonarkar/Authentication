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


export default function SelectedBlog() {
  const [isLiked, setisLiked] = useState(false);
  const [commnetKaru, setcommentKaru] = useState();
  const blogId = useParams().id;
  const [blog, setblog] = useState({});
  const { authUser } = useAuthContext();
const navigate=useNavigate()
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


  const handleDeletePost=async()=>{
    try {
      const res = await axios.delete(
        "http://localhost:8000/post/delete/" + blogId,{withCredentials:true}
      );
      // console.log(res.data)
      if(res.data.sucess){
        toast.success(res.data.message)
        navigate("/")
      }
      else{
        toast.error(res.data.message)

      }
      // console.log(blog)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchBlogInfo();
  }, [blogId]);

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
            {/* <div className=" bg-slate-200 p-1 px-3 rounded-2xl "> Career</div>
            <div className=" bg-slate-200 p-1 px-3 rounded-2xl "> Job</div>
            <div className=" bg-slate-200 p-1 px-3 rounded-2xl "> Tech</div> */}
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
                onClick={() => setcommentKaru(true)}
              >
                <FaRegCommentDots className="text-2xl text-slate-400 hover:text-slate-600 cursor-pointer" />
              </a>
              <FaShare className="text-2xl text-slate-400 hover:text-slate-600 cursor-pointer" />
            </div>
            <div></div>
            {authUser?._id === blog?.userId && (
              <div className="flex items-center justify-center space-x-2">
                <p
                  className="cursor-pointer text-3xl text-slate-600 hover:text-slate-700"
                  onClick={() => navigate("/updateBlog/" + blogId)}
                >
                  <BiEdit />
                </p>
                <p className="cursor-pointer text-3xl text-slate-600 hover:text-slate-700" onClick={handleDeletePost}>
                  <MdDelete />
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
              {/* <br />
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id,
              atque eveniet debitis assumenda expedita cumque aliquid, repellat
              ab magni obcaecati suscipit minus molestias sint incidunt
              reprehenderit iusto. Ullam ea quisquam beatae aut quibusdam nisi
              quod aliquid pariatur in assumenda, ut dolore sed animi laboriosam
              magni doloribus asperiores. Quisquam voluptate sapiente quibusdam
              earum itaque amet. Reiciendis, ipsa! Accusamus sed beatae alias
              hic quas excepturi praesentium debitis aliquid id exercitationem
              reprehenderit laudantium illum blanditiis dolorum fuga unde, iusto
              at dicta consequatur eaque voluptatum quia inventore dolor. Sunt
              corporis similique maiores veritatis nulla quis voluptate ut!
              Debitis ad, fugiat voluptates optio, pariatur ipsa, dolore quidem
              error laboriosam dolores delectus natus minus. Molestias
              laudantium, eaque officiis aperiam consequatur quaerat eligendi
              mollitia cumque illo fuga ut! Possimus adipisci molestiae dolor at
              nihil quaerat praesentium porro tenetur. Reprehenderit possimus
              vero quis iste quisquam molestias veritatis quam ullam quod!
              Dolorem ea aut sed placeat quas laborum, totam vel doloribus
              corporis magnam aspernatur perferendis ratione quae fugiat iusto
              exercitationem! Harum est incidunt, autem quia veniam eaque optio
              delectus nisi. Ratione nesciunt accusamus beatae, odio veniam
              molestiae aspernatur a fugiat sint non laudantium recusandae
              corrupti harum sequi, eius commodi. Molestias vel beatae labore
              obcaecati ut repellat esse earum laborum eaque blanditiis
              perspiciatis nesciunt aliquam distinctio nulla commodi, fugit
              dignissimos quis sunt architecto consequuntur. Natus deleniti quo
              veritatis perspiciatis harum rerum minima fugiat omnis tempora ab!
              Rerum beatae dolores, ipsum similique fugit, laboriosam fuga saepe
              optio explicabo modi qui placeat earum numquam voluptas voluptatem
              accusamus. Delectus facilis itaque deserunt, non earum cum in
              distinctio atque molestiae nam magnam harum eligendi dolorem
              adipisci suscipit repellendus fugit rem accusamus veniam ad
              excepturi pariatur. <br /> <br />
              Tenetur harum ex quae provident tempore, officiis, mollitia
              reiciendis illo cum laborum libero temporibus animi, optio velit
              molestiae? Dicta autem at labore natus ab ipsam animi unde, neque
              numquam. Reprehenderit voluptatibus dolorum, modi iste dolore iure
              aut maxime? Ipsa fugit non sunt dolorem optio sequi tenetur
              veritatis a, accusamus asperiores obcaecati, ea, mollitia itaque
              corrupti atque unde! Recusandae, natus. Facilis alias quos ipsam
              voluptates, similique explicabo nulla est provident ea eos cumque,
              accusamus eius esse nam deserunt unde, id molestiae repellat quod
              quidem deleniti eum aliquam cupiditate sapiente! Iure voluptatum
              eligendi itaque laboriosam delectus! Vero porro itaque, beatae
              voluptatem minima id aliquid doloribus quidem veniam officiis odit
              rerum voluptates accusantium officia aliquam sed corporis quis,
              obcaecati labore harum? Eaque autem dolorum odit dolores ad
              blanditiis hic incidunt dignissimos, amet doloremque atque
              voluptates ullam adipisci maxime molestiae officia, nihil id sequi
              inventore repellat deleniti.
              <br />
              <br />
              Harum nesciunt explicabo maiores recusandae porro quibusdam
              necessitatibus dolorem illum repudiandae, beatae qui itaque
              perferendis suscipit quis, deleniti non commodi tempore iusto sit
              iure accusamus? Dolore eaque alias animi dolorum praesentium eum
              ut neque optio rerum possimus ea nostrum voluptatibus velit
              provident numquam libero labore, in illum perferendis ratione
              laborum blanditiis maxime? Amet, ipsum ipsa natus cum consectetur
              sapiente iusto, enim accusamus harum minima iste autem
              voluptatibus perspiciatis quo laudantium similique voluptatum?
              Corporis rem pariatur quidem adipisci veritatis iure? Voluptates
              est nisi, exercitationem distinctio dolor totam? */}
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
              className="text-2xl text-slate-400 hover:text-slate-600 cursor-pointer"
              onClick={() => setcommentKaru(true)}
            />
            <FaShare className="text-2xl text-slate-400 hover:text-slate-600 cursor-pointer" />
          </div>
          {/* {user?._id===blog?.userId &&  */}
          {/* <div className="flex items-center justify-center space-x-2">
            <p className="cursor-pointer" onClick={()=>navigate("/edit/"+postId)} ><BiEdit/></p>
            <p className="cursor-pointer" onClick=""><MdDelete/></p>
         </div> */}
          {/* } */}
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
                />
                <button className="p-3 bg-indigo-500 text-white text-sm hover:bg-indigo-600 rounded-sm  ">
                  Add Comment
                </button>
              </div>
            </div>
          )}
          <div className="comment-section  w-full bg-slate-50 p-3 rounded  ">
            <div className="font-semibold text-slate-600">All Comments</div>
            <div className="text-sm m-3 flex flex-col gap-2">
              <div>username</div>
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure,
                dolorem.
              </div>
              <div>20 Jun 2024</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
