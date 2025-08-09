import React, { useState } from 'react'
import logo from '../images/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { provider, auth } from '../firebaseConfig'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'




const Login = () => {

    let navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [pwd, setPwd] = useState("")
    const [Error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const submitForm = async (e) => {
        e.preventDefault()
        setLoading(true)

        if (pwd.length < 6) {
            setError("Password must include 6 chars.")
            return
        }

        try {
            await signInWithEmailAndPassword(auth, email, pwd)
            console.log("user is signed in ")
            navigate("/")

        } catch (error) {

            console.log(error.code)
            console.log(error.message)
       

            if (error.code === 'auth/user-not-found') {
                setError("No user found with this email")
            } else if (error.code === 'auth/wrong-password') {
                setError("Incorrect password")
            } else if (error.code === 'auth/invalid-email') {
                setError("Invalid email address")
            } else if (error.code === 'auth/invalid-credential') {
                setError("Invalid Email or Password")
            } else {
                setError(error.code)
            }

        }

        setLoading(false)
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
            console.error("Google Sign-In error:", error.message);
        }
    };
    return (
        <>

            <div className="con flex flex-col justify-center items-center h-screen bg-[#070707]">

                <h1 className='text-2xl !mb-5 font-bold'>Login to Bloggy</h1>


                <form onSubmit={submitForm} className='w-[26vw] min-h-[auto] bg-[#0f0e0e]  rounded-2xl !p-5 flex flex-col items-center '>
                    <img className='!-mt-3 w-[240px] object-cover h-[100px]' src={logo} alt="Bloggy" />

                    <div className='w-full'>
                        <p className='text-[gray] text-[14px] !mt-3'>Email</p>
                        <div className="inputBox">
                            <input onChange={(e) => { setEmail(e.target.value) }} value={email} type="email" placeholder='Email' required />
                        </div>

                        <p className='text-[gray] text-[14px] !mt-3'>Password</p>
                        <div className="inputBox">
                            <input onChange={(e) => { setPwd(e.target.value) }} value={pwd} type="password" placeholder='Password' required />
                        </div>

                        <p className='text-[14px] text-[gray] !mt-3 !mb-1'>Don't Have an account <Link to="/signUp" className='text-purple-600'>Sign Up</Link></p>


                        <button className="btnNormal w-full">{loading ? "Signing In..." : "Login"}</button>

                        {Error && <p className="text-red-600 text-sm !mt-2 text-center">{Error}</p>}

                    </div>

                </form>
                <h3 >or</h3>
                <br />
                <button className="flex items-center justify-center gap-3 w-[200px] !px-5 !py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-400 hover:bg-[white] " onClick={handleGoogleSignIn}>
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

export default Login