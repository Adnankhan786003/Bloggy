import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Nopage from './pages/Nopage';
import './App.css'
import SingleBlog from './pages/SingleBlog';
import Signup from './pages/Signup';
import Login from './pages/Login';
import CreatePost from './pages/CreatePost';



const App = () => {
  return (
    <div >
      <BrowserRouter>
      

          <Routes>

            <Route path='/' element={<Home />} />
            <Route path='/signUp' element={<Signup />} />
            <Route path='/blog/:blogid' element={<SingleBlog />} />
            <Route path='/login' element={<Login />} />
            <Route path='/createPost' element={<CreatePost />}></Route>

            <Route path="*" element={<Nopage />} />

          </Routes>
    
      </BrowserRouter>
    </div>
  )
}

export default App
