import React, { useState, useEffect, useContext } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Blogs from '../components/Blogs'
import Footer from '../components/Footer'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'


const Home = () => {

  const user = useContext(AuthContext)

  // let navigate = useNavigate()

  // useEffect(() => {
  //   if (!user) {
  //     navigate("/login")
  //   }
  // }, [user, navigate]) 

  // if (!user) {
  //   return <Spinner size={200}/>
  // }

  return (
    <div>
      <Navbar />
      <Hero />
      <Blogs />
      <Footer />
    </div>
  )
}

export default Home