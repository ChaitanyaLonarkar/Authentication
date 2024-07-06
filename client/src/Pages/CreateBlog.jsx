import axios from "axios";
import { useState, useRef } from "react";
import React from "react";
import toast from "react-hot-toast";
import { ImCross } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { Server } from "../context/TimeAgo";
import BeatLoader from "react-spinners/BeatLoader";

import JoditEditor from "jodit-react";

export default function CreateBlog() {

  // const config = {
  //   height: 400,
  //   buttons: "bold,italic,underline,strikethrough,eraser,ul,ol,font,fontsize,paragraph,lineHeight,superscript,subscript,image,cut,copy,paste,selectall,copyformat"

  // };
  const [loader, setLoader] = useState(false);

  const [cat, setcat] = useState("");
  const [cats, setcats] = useState([]);
  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");
  // const [, setcat] = useState("");
  const navigate = useNavigate();

  const editor = useRef(null);

  const { authUser } = useAuthContext();

  const addCategory = () => {
    if (cat == "") {
      return toast.error("Please add the category");
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

  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);

  const createBlogPost = async () => {
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
        post.thumbnail = filename;
        // console.log(formData,"fomrdata")

        //img upload
        try {
          const imgUpload = await axios.post(
            Server + "image/upload",
            formData,
            { withCredentials: true }
          );
          // console.log(imgUpload, "image upload");
        } catch (err) {
          toast.error(err.response.data.message);
        }
      }

      const res = await axios.post(Server + "post/create", post, {
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
      toast.error(error.response.data.message);
    }finally {
      setLoader(false);
    }
  };

  return (
    <>
      <div className="flex justify-center my-4  items-center ">
        <div className=" md:w-[50rem] max-[400px]:w-[95%]  bg-white p-3 min-[501px]:w-[87%] min-[401px]:p-7 md:p-12 flex flex-col gap-8 sm:gap-10 rounded-lg">
          <div className="font-bold max-[400px]:text-xl text-center sm:text-start text-3xl  text-indigo-950 opacity-95">
            Create New Blog here
          </div>
          <div className="flex flex-col gap-4 max-[400px]:text-sm ">
            <div className="font-semibold text-indigo-900">Add Thumbnail</div>
            <input
              type="file"
              className="text-sm text-stone-500
   file:mr-5 file:py-2 file:px-3 
    file:font-medium file:border-0
   file:bg-indigo-500 file:text-white
   hover:file:cursor-pointer hover:file:bg-blue-50
   hover:file:text-blue-700"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          <div className="flex flex-col gap-4 max-[400px]:text-sm">
            <div className="font-semibold text-indigo-900">Add Title</div>
            <input
              type="text"
              placeholder="Give title name"
              className="bg-slate-200 p-3 outline-none"
              onChange={(e) => settitle(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-4 max-[400px]:text-sm">
            <div className="font-semibold text-indigo-900 ">Add Category</div>
            <div className=" flex flex-col">
              <div className="flex items-center  md:space-x-8">
                <input
                  type="text"
                  className="px-4 py-2 outline-none bg-slate-200 max-[400px]:w-[60%]"
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

              <div className="flex  mt-4">
                {cats.map((cat, k) => (
                  <div
                    key={k}
                    className="flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md"
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
            <div className="font-semibold text-indigo-900">Add Description</div>
            {/* <textarea
              name="desc"
              id=""
              placeholder="add paragraph"
              className="bg-slate-200 p-3 outline-none"
              onChange={(e) => setdesc(e.target.value)}
              rows={8}
              cols={40}
              required
            >
             
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
              className="p-2 px-4 max-[400px]:text-xs rounded bg-indigo-500 hover:bg-indigo-400 text-white w-[130px] max-[400px]:w-[110px]"
              onClick={createBlogPost}
            >
             {loader ? (
                <div className="flex  p-[0.35rem] justify-center ">
                  <BeatLoader size={10} color="white"/>
                </div>
              ) : (
                <div>Create Blog</div>
              )}
            </button>

          </div>
        </div>
      </div>
    </>
  );
}
