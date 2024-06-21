import React from "react";
import toast from "react-hot-toast";
import { Link, redirect, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Logout() {
  const navigate = useNavigate();
  const logout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/logout",
        {},
        {
          withCredentials: true,
        }
      ); // Make sure the URL is correct
      console.log(response.data);
      if (response.data.status) {
        toast.success(response.data.message);
        // navigate("/");
        window.location.reload(true)

        localStorage.clear();
        navigate("/login");

      } else {
        toast.success(response.data.message);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || "An error occurred";
      toast.error(errorMessage);
    }
  };
  return (
    <>
      <button type="submit" onClick={logout}
                className="py-2 px-4 rounded-md bg-indigo-100 font-bold  hover:bg-violet-200 text-indigo-700 "

      >
        Logout
      </button>
    </>
  );
}
