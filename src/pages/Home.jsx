import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Blogs from '../components/Blogs'
import Footer from '../components/Footer'

const Home = () => {
  
  return (
    <div>
        <Navbar/>
        <Hero/>
        <Blogs/>
        <Footer/>
    </div>
  )
}

export default Home