import { useState } from "react";
import React from "react";
import toast from "react-hot-toast";
import { ImCross } from "react-icons/im";
export default function UpdateBlog() {
  const [cat, setcat] = useState("");
  const [cats, setcats] = useState([]);

  const addCategory = () => {
    if(cat==""){
      return  toast.error("kuch to dal category me")
    }
    let updatedCat = [...cats];
    updatedCat.push(cat);
    setcat("");
    setcats(updatedCat);
    console.log(cats)
  };
  const delCategory = (k) => {
    let updatedCat = [...cats];
    updatedCat.splice(k,1);
    setcats(updatedCat);
    console.log(cats,"........................................")
  };

  return (
    <>
      <div className="flex justify-center my-4  items-center ">
        <div className=" md:w-[50rem] max-[400px]:w-[95%]  bg-white p-3 min-[501px]:w-[87%] min-[401px]:p-7 md:p-12 flex flex-col gap-8 sm:gap-10 rounded-lg">
          <div className="font-bold max-[400px]:text-xl text-center sm:text-start text-3xl  text-indigo-950 opacity-95">
          Update Blog here
          </div>
          <div className="flex flex-col gap-4 max-[400px]:text-sm ">
            <div className="font-semibold text-indigo-900">Update Thumbnail</div>
            <input type="file" placeholder="dfgdfg" className="" />
          </div>
          <div className="flex flex-col gap-4 max-[400px]:text-sm">
            <div className="font-semibold text-indigo-900">Update Title</div>
            <input
              type="text"
              placeholder="dfgdfg"
              className="bg-slate-200 p-3 outline-none"
            />
          </div>

          <div className="flex flex-col gap-4 max-[400px]:text-sm">
            <div className="font-semibold text-indigo-900 ">Update Category</div>
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
                  <div key={k} className="flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md">
                    <p>{cat}</p>
                    <p
                      className="text-slate-500 rounded-full cursor-pointer p-1 text-sm"
                      onClick={()=>delCategory(k)}
                    >
                      <ImCross />
                    </p>
                  </div>
                ))}

              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 max-[400px]:text-sm">
            <div className="font-semibold text-indigo-900">Update Description</div>
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
            <button className="p-2 px-4 max-[400px]:text-xs rounded bg-indigo-500 hover:bg-indigo-400 text-white ">
            Update Blog
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
