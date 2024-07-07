import { useState, useRef } from "react";
import React from "react";
import toast from "react-hot-toast";
import { ImCross } from "react-icons/im";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import { useEffect } from "react";
import { Server } from "../context/TimeAgo";
import JoditEditor from "jodit-react";
import BeatLoader from "react-spinners/BeatLoader";

export default function UpdateBlog() {
  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");
  const [file, setFile] = useState(null);
  const [cat, setcat] = useState("");
  const [loader, setLoader] = useState(false);

  const [cats, setcats] = useState([]);

  const editor = useRef(null);

  const blogId = useParams().id;
  const navigate = useNavigate();
  const { authUser } = useAuthContext();

  const addCategory = () => {
    if (cat == "") {
      return toast.error("kuch to dal category me");
    }
    let updatedCat = [...cats];
    updatedCat.push(cat);
    setcat("");
    setcats(updatedCat);
    // console.log(cats);
  };
  const delCategory = (k) => {
    let updatedCat = [...cats];
    updatedCat.splice(k, 1);
    setcats(updatedCat);
    // console.log(cats, "........................................");
  };
  const fetchPost = async () => {
    try {
      const res = await axios.get(Server + "post/getpost/" + blogId);
      // console.log(res.data);

      settitle(res.data.oneBlog.title);
      setdesc(res.data.oneBlog.desc);
      setFile(res.data.oneBlog.thumbnail);
      setcats(res.data.oneBlog.categories);
    } catch (err) {
      toast.error(err);
    }
  };

  const updateBlogPost = async () => {
    setLoader(true);
    try {
      const post = {
        title: title,
        desc: desc,
        categories: cats,
        username: authUser.name,
        userId: authUser._id,
       
      };

      if (file) {
        const formData = new FormData();
        const filename = Date.now() + file.name;
        formData.append("img", filename);
        formData.append("file", file);
        // if (filename) {
        //   post.thumbnail = filename;
        // } else {
        //   post.thumbnail = file;
        // }
        // console.log(formData,"fomrdata")

        //img upload
        try {
          const imgUpload = await axios.post(
            Server + "image/upload",
            formData,
            { withCredentials: true }
          );
          // console.log(imgUpload, "image upload");
          post.thumbnail = imgUpload.data.downloadURL;

        } catch (err) {
          console.log(err);
        }
      }

      const res = await axios.put(Server + "post/update/" + blogId, post, {
        withCredentials: true,
      });

      // console.log(res.data);
      if (res.data.sucess) {
        navigate("/bloginfo/" + res.data.post._id);
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [blogId]);

  return (
    <>
      <div className="flex justify-center my-4  items-center ">
        <div className=" md:w-[50rem] max-[400px]:w-[95%]  bg-white p-3 min-[501px]:w-[87%] min-[401px]:p-7 md:p-12 flex flex-col gap-8 sm:gap-10 rounded-lg">
          <div className="font-bold max-[400px]:text-xl text-center sm:text-start text-3xl  text-indigo-950 opacity-95">
            Update Blog here
          </div>
          <div className="flex flex-col gap-4 max-[400px]:text-sm ">
            <img src={file} alt="thumbnail" />
            <div className="font-semibold text-indigo-900">
              Update Thumbnail
            </div>
            <input
              type="file"
              className="text-sm text-stone-500
   file:mr-5 file:py-2 file:px-3 
    file:font-medium file:border-0
   file:bg-indigo-500 file:text-white
   hover:file:cursor-pointer hover:file:bg-blue-50
   hover:file:text-blue-700"
              onChange={(e) => setFile(e.target.files[0])}
              // value={file}
            />
          </div>
          <div className="flex flex-col gap-4 max-[400px]:text-sm">
            <div className="font-semibold text-indigo-900">Update Title</div>
            <input
              type="text"
              className="bg-slate-200 p-3 outline-none"
              onChange={(e) => settitle(e.target.value)}
              value={title}
            />
          </div>

          <div className="flex flex-col gap-4 max-[400px]:text-sm">
            <div className="font-semibold text-indigo-900 ">
              Update Category
            </div>
            <div className=" flex flex-col">
              <div className="flex items-center  md:space-x-8">
                <input
                  type="text"
                  className="px-4 py-2 outline-none bg-slate-200 "
                  placeholder="enter category "
                  onChange={(e) => setcat(e.target.value)}
                  value={cat}
                />
                <div
                  className="bg-indigo-500 text-white px-4 py-2 font-semibold cursor-pointer"
                  onClick={addCategory}
                >
                  Add
                </div>
              </div>

              <div className="flex  flex-wrap mt-4">
                {cats?.map((cat, k) => (
                  <div
                    key={k}
                    className="flex justify-center items-center space-x-2 mr-4 mt-4 bg-gray-200 px-2 py-1 rounded-md"
                  >
                    <p>{cat}</p>
                    <p
                      className="text-slate-500 rounded-full cursor-pointer p-1 text-sm"
                      onClick={() => delCategory(k)}
                    >
                      <ImCross />
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 max-[400px]:text-sm">
            <div className="font-semibold text-indigo-900">
              Update Description
            </div>
            {/* <textarea
              name="desc"
              id=""
              placeholder="add paragraph"
              className="bg-slate-200 p-3 outline-none"
              onChange={(e) => setdesc(e.target.value)}
              value={desc}
              rows={8} cols={40}
            >
              {" "}
            </textarea> */}
            <JoditEditor
              ref={editor}
              value={desc}
              // readOnly={false}
              // config={config}
              tabIndex={1} // tabIndex of textarea
              onChange={(newContent) => setdesc(newContent)}
            />
          </div>

          <div>
            <button
              className="p-2 px-4 max-[400px]:text-xs rounded bg-indigo-500 hover:bg-indigo-400 text-white "
              onClick={updateBlogPost}
            >
              {loader ? (
                <div className="flex  p-[0.35rem] justify-center ">
                  <BeatLoader size={10} color="white" />
                </div>
              ) : (
                <div> Update Blog</div>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
