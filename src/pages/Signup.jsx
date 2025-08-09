import React, { useState } from 'react'
import logo from '../images/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { auth, provider } from '../firebaseConfig'
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth'




const Signup = () => {

    const [email, setEmail] = useState("")
    const [pwd, setPwd] = useState("")
    const [Error, setError] = useState("")
    const [loading, setloading] = useState(false)

    let navigate = useNavigate()

    const submitForm = async (e) => {
        e.preventDefault()


        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address")
            return
        }

        if (pwd.length < 6) {
            setError("Password must be at least 6 characters")
            return
        }

        setloading(true)

        try {
            await createUserWithEmailAndPassword(auth, email, pwd)

            console.log("user signed up")
            navigate("/login")
        }catch (error) {
            console.log(error)
            console.log(error.code)
            
            if (error.code === 'auth/email-already-in-use') {
                setError("Email is already in use")
            } else if (error.code === 'auth/invalid-email') {
                setError("Invalid Email")
            } else if (error.code === 'auth/weak-password') {
                setError("Weak password(Must include one a/A/1/symbol)")
            } else {
                setError(error.message)
            }

        }

        setloading(false)
    }

    const handleGoogleSignIn = async () => {
        provider.setCustomParameters({
            prompt: "select_account"
        })

        try {
            await signInWithPopup(auth, provider);

            console.log("Google Sign-In successful");
            navigate("/")

        } catch (error) {
            console.log(error.code)
            console.log(error.message);
        }
    };

    return (
        <>
            <div className="con flex flex-col justify-center items-center h-screen bg-[#070707]">

                <h1 className='text-2xl !mb-5 font-bold'>Sign Up to Bloggy</h1>

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

                        <button className="btnNormal w-full"> {loading ? "Signing Up..." : "Sign Up"}</button>

                    </div>

                     {Error && <p className="text-red-600 text-sm ">{Error}</p>}

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