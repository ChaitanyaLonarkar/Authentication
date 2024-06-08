import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import './App.css'
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Home from './Pages/Home';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <BrowserRouter>
      <Routes>
       
          <Route index element={<Home />} />
          <Route path="signup" element={<Signup/>} />
          <Route path="login" element={<Login />} />
        
      </Routes>
    </BrowserRouter>
          <Toaster />
    </>
  )
}

export default App
