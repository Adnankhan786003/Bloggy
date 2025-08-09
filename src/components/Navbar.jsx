import React, { useContext } from 'react'
import logo from '../images/logo.png'
import { Link } from "react-router-dom";
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';



const Navbar = () => {

  

    async function signUserOut() {
        await signOut(auth).then(() => {
            window.location.pathname = "/login"
        })
    }

    return (
        <>
            <div className="navbar  !px-[100px] flex items-center h-[100px] bg-[#0c0c0c] justify-between overflow-hidden ">

                <div className="logo">
                    <img className='w-[220px]' src={logo} alt="logo" />
                </div>

                <div className="links flex items-center gap-[20px]  ">

                    <Link className='navLink active' to="/">Home</Link>
                    <Link className='navLink ' to="/createpost">Create</Link>

                    <Link className='navLink' to="/login">Login</Link>

                    <button onClick={signUserOut} className='btnNormal'>Logout</button>

                </div>

            </div>
        </>
    )
}

export default Navbar