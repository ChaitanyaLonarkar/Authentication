import React, { useEffect, useState } from "react";
import { Link, useFetcher, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { Server } from "../context/TimeAgo";
import BeatLoader from "react-spinners/BeatLoader";

export default function ProfileUpdate() {
  const navigate = useNavigate();
  const { authUser, setAuthUser } = useAuthContext();
  const [username, setusername] = useState(authUser.name);
  const [password, setpassword] = useState(authUser.profilePic);
  const [email, setemail] = useState(authUser.email);
  const [loader, setLoader] = useState(false);

  const [file, setfile] = useState(authUser.profilePic);
  const updateProfile = async () => {
    setLoader(true);

    try {
      const upuser = {
        name: username,
        email: email,
        password: password,
      };

      if (file) {
        const formData = new FormData();
        const filename = Date.now() + file.name;
        formData.append("img", filename);
        formData.append("file", file);
        // if (!filename)
        //   upuser.profilePic = file;
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
          upuser.profilePic= imgUpload.data.downloadURL;

        } catch (err) {
          toast.error(err.message);
        }
      }

      const res = await axios.put(
        Server + "user/update/" + authUser._id,
        upuser,
        {
          withCredentials: true,
        }
      );

      // console.log(res.data);
      if (res.data.sucess) {
        localStorage.setItem("user", JSON.stringify(res.data.updatedUser));
        setAuthUser(res.data.updatedUser);
        navigate("/myprofile");
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      <div className="flex justify-center my-4  items-center ">
        <div className=" md:w-[30rem] max-[400px]:w-[95%]  bg-white p-3 min-[501px]:w-[87%] min-[401px]:p-7 md:p-12 flex  gap-8 sm:gap-10 rounded-lg">
          <div className=" flex flex-col gap-8 w-[100%] ">
            <div className="font-bold max-[400px]:text-xl text-center sm:text-start text-2xl  text-indigo-950 opacity-95">
              Updtae Profile
            </div>

            <div className=" font-medium flex flex-col gap-8">
              <div className="w-[200px] rounded-lg overflow-hidden ">
                {/* <img
                  src="https://avatars.githubusercontent.com/u/110454138?v=4"
                  alt=""
                /> */}
                <img src={authUser.profilePic} alt="pic" />
              </div>
              <div className="flex flex-col gap-3">
                Update Pic :
                <input
                  type="file"
                  placeholder="dfgdfg"
                  className="text-sm text-stone-500
   file:mr-5 file:py-2 file:px-3 
    file:font-medium file:border-0
   file:bg-indigo-500 file:text-white
   hover:file:cursor-pointer hover:file:bg-blue-50
   hover:file:text-blue-700"
                  onChange={(e) => setfile(e.target.files[0])}
                  // value={file}
                />
              </div>
              <div className="flex flex-col gap-3">
                UserName :
                <input
                  type="text"
                  className="bg-slate-100 outline-none w-[100%] p-2 text-base text-indigo-800 rounded"
                  value={username}
                  onChange={(e) => {
                    setusername(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col gap-3">
                Email :
                <input
                  type="text"
                  className="bg-slate-100 outline-none w-[100%] p-2 text-base text-indigo-800 rounded"
                  value={email}
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col gap-3">
                Password :
                <input
                  type="password"
                  className="bg-slate-100 outline-none w-[100%] p-2 text-base text-indigo-800 rounded"
                  placeholder="Enter new password or remain empty"
                  onChange={(e) => {
                    setpassword(e.target.value);
                  }}
                />
              </div>
              <div className=" cursor-pointer hover:bg-indigo-500  p-2 bg-indigo-600 text-white w-[max-content] rounded text-base  px-4">
                <Link onClick={updateProfile}>
                
                
                {loader ? (
                <div className="flex  p-[0.25rem] justify-center ">
                  <BeatLoader size={10} color="white"/>
                </div>
              ) : (
                <div>Update Profile</div>
              )}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
