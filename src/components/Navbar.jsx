import React, { useState, useEffect, useContext } from 'react'
import logo from '../images/logo.png'
import { Link, useNavigate } from "react-router-dom";
import { auth } from '../firebaseConfig';
import { AuthContext } from '../context/AuthContext';
import { signOut } from 'firebase/auth';


const Navbar = () => {
    
    const user = useContext(AuthContext)

    let navigate = useNavigate()

    async function signUserOut() {
        try {
            await signOut(auth);
            console.log("user is Signed out")
            navigate("/login")
        } catch (error) {
            console.log(error.code)   
        }
    }

   
  
    return (
        <>
            <div className="navbar  !px-[100px] flex items-center h-[100px] bg-[#0c0c0c] justify-between overflow-hidden ">

                <div className="logo">
                    <img className='w-[220px]' src={logo} alt="logo" />
                </div>

                <div className="links flex items-center gap-[20px]  ">

                    <Link className='navLink active' to="/">Home</Link>
                    {user &&  <Link className='navLink ' to="/createpost">Create</Link>}
                    {user &&  <Link className='navLink ' to="/myblogs">MyBlogs</Link>}
                    {user &&  <button onClick={signUserOut} className='btnNormal'>Logout</button>}
                    {!user && <Link className='navLink' to="/login">Login</Link>}

                   

                </div>

            </div>
        </>
    )
}

export default Navbar