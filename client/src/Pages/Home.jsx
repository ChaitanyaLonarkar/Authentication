import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Logout from "./Logout";

export default function Home() {
  const navigate = useNavigate();

  const verifyUser = async (e) => {
    try {
      const response = await axios.get("http://localhost:8000/", {
        withCredentials: true,
      }); // Make sure the URL is correct

      if (response.data.status) {
        // toast.success(response.data.message || "User verified successfully");
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || "An error occurred";
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

  return (
    <>
      <h3>Home</h3>
      <br />
      <Logout />
    </>
  );
}
