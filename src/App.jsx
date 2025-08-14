import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Nopage from './pages/Nopage';
import './App.css'
import SingleBlog from './pages/SingleBlog';
import Signup from './pages/Signup';
import Login from './pages/Login';
import CreatePost from './pages/CreatePost';
import 'jodit/es2021/jodit.min.css';
import { AuthProvider } from './context/AuthContext';
import Myblogs from './pages/Myblogs';



const App = () => {
  return (
    <div >
     <AuthProvider>
       <BrowserRouter>
      
          <Routes>

            <Route path='/' element={<Home />} />
            <Route path='/signUp' element={<Signup />} />
            <Route path='/blog/:blogid' element={<SingleBlog />} />
            <Route path='/login' element={<Login />} />
            <Route path='/createPost' element={<CreatePost />}></Route>
            <Route path='/myblogs' element={<Myblogs />}></Route>

            <Route path="*" element={<Nopage />} />

          </Routes>
    
      </BrowserRouter>
     </AuthProvider>
    </div>
  )
}

export default App
