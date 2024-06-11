import React from "react";
import toast from "react-hot-toast";
import { Link, redirect, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Logout() {
  const navigate = useNavigate();
  const logout = async () => {
    try {
    const response = await axios.post("http://localhost:8000/logout", {
      withCredentials: true,
    }); // Make sure the URL is correct
    console.log(response.data);
    if (response.data.status) {
      toast.success(response.data.message);
      // navigate("/");
      navigate("/login");
    }
    else{
        toast.success(response.data.message);
    }
    } catch (error) {
      const errorMessage = error.response?.data?.error || "An error occurred";
      toast.error(errorMessage);
    }
  };
  return (
    <>
      <button type="submit" onClick={logout}>
        Logout
      </button>
    </>
  );
}
