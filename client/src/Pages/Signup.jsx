import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confpassword, setconfPassword] = useState("");
  const [rdata, setrdata] = useState("");

  // const notify = () => ;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   const serverResponse = await axios.post(
    //     "http://localhost:8000/signup",
    //     { name, email, password, confpassword },
    //     // { withCredentials: true }
    //   );
    //   console.log(serverResponse.data);
    //   toast.success(response.data.message || 'User created successfully');
    //   // const {response}
    //   // if (serverResponse) {
    //     toast.success("Here done toast.");
    //     console.log("sdhgfhsgdhfgshdfghsd",serverResponse);
    //   // } else {
    //   //   toast.error("erererere");
    //   // }
    //   // console.log(name, email, password, confpassword);
    //   // const response= await axios.post()
    // } catch (error) {
    //   toast.error("error hai bhai ....")
    // }
    try {
      const response = await axios.post('http://localhost:8000/signup', { name, email, password, confpassword }); // Make sure the URL is correct
      toast.success(response.data.message || 'User created successfully');
      navigate("/login");
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'An error occurred';
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <div className="sign">
        <h1>Signup</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Name</label>
            <input
              type="text"
              name="username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>
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
          <div>
            <label htmlFor="password">Confirm Password</label>
            <input
              type="password"
              name="password"
              value={confpassword}
              placeholder="Enter your password"
              onChange={(e) => setconfPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Submit</button>
          <span>
            Already have an account? <Link to={"/login"}>Login</Link>
          </span>

          {/* <button onClick={notify}>Make me a toast</button> */}
          <Toaster />
        </form>
      </div>
      <div>sjhdgfhjasgdhfgashjdgfhjgsajdfhghasgdf{rdata}</div>
    </>
  );
}
