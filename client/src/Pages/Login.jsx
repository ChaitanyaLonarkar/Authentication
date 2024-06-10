import React from "react";
import { useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authuser,setAuthuser]=useState()
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/login', {email,password},{
        withCredentials: true,
      });
      console.log(response.data)
      // localStorage.setItem(response?.data?.user)
      toast.success(response.data.message || 'User logged in successfully');
      console.log(response.data.user)

      setAuthuser(JSON.stringify(response.data.user))
      navigate("/")
      console.log("usersersdhfjshd",authuser)
    } catch (error) {
      toast.error(error.response?.data?.error || 'An error occurred');
    }
  
  }
  return (
    <>
      <div className="sign">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">Login</button>
          <span>
            Dont have an account? <Link to={"/signup"}>Signup</Link>
          </span>

          {/* <button onClick={notify}>Make me a toast</button> */}
        </form>
      </div>
    </>
  );
}
