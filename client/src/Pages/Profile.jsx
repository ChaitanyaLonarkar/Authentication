import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Logo from "../assets/logo.png";
import il1 from "../assets/il1c.png";
import tu from "../assets/illus.jpg";
export default function Profile() {
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
                  {/* {blogs.map((b) => {
            <div>
              <img src={b.thumbnail} alt="" />
              <div>{b.categories}</div>
              <div>{b.title}</div>
              <div>{b.description}</div>
            </div>;
          })} */}

                  <div className="l-blog   ">
                    <div className="  rounded-xl overflow-hidden  ">
                      <img src={tu} alt="" />
                    </div>
                    <div className=" flex flex-col  justify-center gap-4 mt-10">
                      <div className="text-indigo-900 font-medium opacity-95 text-xl">
                        Cooking
                      </div>
                      <div className="font-bold text-4xl  text-indigo-900 opacity-95">
                        <Link to="">
                          A Sweet Cake with Chocolate and Strawberry
                        </Link>
                      </div>
                      <div className="text-slate-700 text-lg">
                        Warner Music Group announced today it’s acquiring the
                        selected assets of the music platform Songkick,
                        including its app for finding concerts and the company’s
                        trademark. Songkick has been involved in a lawsuit
                        against the major…
                        <Link to="" className=" text-base text-sky-700">
                          Read More
                        </Link>
                      </div>
                      <div>by Chaitanya Lonarkar,2 days ago</div>
                    </div>
                  </div>
                  <div className="l-blog   ">
                    <div className="  rounded-xl overflow-hidden  ">
                      <img src={tu} alt="" />
                    </div>
                    <div className=" flex flex-col  justify-center gap-4 mt-10">
                      <div className="text-indigo-900 font-medium opacity-95 text-xl">
                        Cooking
                      </div>
                      <div className="font-bold text-4xl  text-indigo-900 opacity-95">
                        <Link to="">
                          A Sweet Cake with Chocolate and Strawberry
                        </Link>
                      </div>
                      <div className="text-slate-700 text-lg">
                        Warner Music Group announced today it’s acquiring the
                        selected assets of the music platform Songkick,
                        including its app for finding concerts and the company’s
                        trademark. Songkick has been involved in a lawsuit
                        against the major…
                        <Link to="" className=" text-base text-sky-700">
                          Read More
                        </Link>
                      </div>
                      <div>by Chaitanya Lonarkar,2 days ago</div>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
          <div className="w-[35%] ">
            <div className="font-bold max-[400px]:text-xl text-center sm:text-start text-2xl  text-indigo-950 opacity-95">My Profile</div>

            <div className="text-lg font-medium flex flex-col gap-5">
                <div></div>
                <div>Name : Chaitanya Lonarkar</div>
                <div>Email : Chaitanyalonarkar@gmail.com</div>
                <div className=" cursor-pointer hover:bg-slate-400  p-2 bg-slate-300 w-[max-content] rounded text-base  px-4">
                    Update Profile
                </div>
                <div className=" cursor-pointer hover:bg-slate-400  p-2 bg-slate-300 w-[max-content] rounded text-base  px-4">
                    Delete Profile
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
