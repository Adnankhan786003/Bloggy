import React, { useState } from 'react'
import logo from '../images/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { auth, provider } from '../firebaseConfig'
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth'




const Signup = () => {

    const [email, setEmail] = useState("")
    const [pwd, setPwd] = useState("")

    let navigate = useNavigate()

    const submitForm = async (e) => {
        e.preventDefault()

        try {
            await createUserWithEmailAndPassword(auth, email, pwd)
           
            console.log("user signed up")
            navigate("/login")


        } catch (error) {
            console.log(error)
        }
    }

    const handleGoogleSignIn = async () => {
        provider.setCustomParameters({
            prompt : "select_account"
        })

        try {
            await signInWithPopup(auth, provider);

            console.log("Google Sign-In successful");
            navigate("/")

        } catch (error) {
            console.log("Google Sign-In error:", error.message);
        }
    };

    return (
        <>
            <div className="con flex flex-col justify-center items-center h-screen bg-[#070707]">

                <form onSubmit={submitForm} className='w-[26vw] min-h-[auto] bg-[#0f0e0e]  rounded-2xl !p-5 flex flex-col items-center '>
                    <img className='!-mt-3 w-[240px] object-cover h-[100px]' src={logo} alt="" />

                    <div className='w-full'>

                        <p className='text-[gray] text-[14px] !mt-3'>Email</p>
                        <div className="inputBox">
                            <input onChange={(e) => { setEmail(e.target.value) }} value={email} type="email" placeholder='Email' required />
                        </div>

                        <p className='text-[gray] text-[14px] !mt-3'>Password</p>
                        <div className="inputBox">
                            <input onChange={(e) => { setPwd(e.target.value) }} value={pwd} type="password" placeholder='Password' required />
                        </div>

                        <p className='text-[14px] text-[gray] !mt-3 !mb-1'>Already Have an account <Link to="/login" className='text-purple-600'>Login</Link></p>

                        <button className="btnNormal w-full">Sign Up</button>

                    </div>

                </form>

                <h3>or</h3>
                <br />

                <button
                    className="flex items-center justify-center gap-3 w-[200px] !px-5 !py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-400 hover:bg-[white] " onClick={handleGoogleSignIn}
                >
                    <img
                        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                        alt="Google"
                        className="w-5 h-5"
                    />
                    Sign in with Google
                </button>


            </div>

        </>
    )
}

export default Signup