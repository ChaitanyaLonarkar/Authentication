import axios from "axios";
import { useState } from "react";
import React from "react";
import toast from "react-hot-toast";
import { ImCross } from "react-icons/im";

export default function CreateBlog() {
  const [cat, setcat] = useState("");
  const [cats, setcats] = useState([]);
  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");
  // const [, setcat] = useState("");

  const addCategory = () => {
    if (cat == "") {
      return toast.error("kuch to dal category me");
    }
    let updatedCat = [...cats];
    updatedCat.push(cat);
    setcat("");
    setcats(updatedCat);
    console.log(cats);
  };
  const delCategory = (k) => {
    let updatedCat = [...cats];
    updatedCat.splice(k, 1);
    setcats(updatedCat);
    console.log(cats, "........................................");
  };

  const [image, setImage] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  console.log(image, "hjghccggggfgffgfggvgvgvbbbbm");

  const createBlogPost = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/post/create",
        {
          thumbnail: "fgdfdfg",
          title: "for",
          desc: "fonrsdndn",
          categories: ["game"],
          userId: "666ea7c341028dc4c4fc2f29",
          username: "chaitanyaa",
        },
        {
          withCredentials: true,
        }
      );

      console.log(res.data);
      if (res.data.sucess) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
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
              placeholder="dfgdfg"
              className="text-sm text-stone-500
   file:mr-5 file:py-2 file:px-3 
    file:font-medium file:border-0
   file:bg-indigo-500 file:text-white
   hover:file:cursor-pointer hover:file:bg-blue-50
   hover:file:text-blue-700"
              onClick={handleFileChange}
            />

            {/* <div class="flex items-center justify-center w-full">
    <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
        </div>
        <input id="dropzone-file" type="file" class="hidden" />
    </label>
</div>  */}
          </div>
          <div className="flex flex-col gap-4 max-[400px]:text-sm">
            <div className="font-semibold text-indigo-900">Add Title</div>
            <input
              type="text"
              placeholder="dfgdfg"
              className="bg-slate-200 p-3 outline-none"
            />
          </div>

          <div className="flex flex-col gap-4 max-[400px]:text-sm">
            <div className="font-semibold text-indigo-900 ">Add Category</div>
            <div className=" flex flex-col">
              <div className="flex items-center  md:space-x-8">
                <input
                  type="text"
                  className="px-4 py-2 outline-none bg-slate-200 "
                  placeholder="enter category "
                  onChange={(e) => setcat(e.target.value)}
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
            <textarea
              name="desc"
              id=""
              placeholder="add paragraph"
              className="bg-slate-200 p-3 outline-none"
            >
              {" "}
            </textarea>
          </div>

          <div>
            <button
              className="p-2 px-4 max-[400px]:text-xs rounded bg-indigo-500 hover:bg-indigo-400 text-white "
              onClick={createBlogPost}
            >
              Create Blog
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
