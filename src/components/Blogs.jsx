import React from 'react'
import Blog from './Blog'

const Blogs = () => {
  return (
    <div className='blogs !px-[100px] !mt-4 mb-[5]'>
        <h3 className="text-2xl">Latest Blogs</h3>

        <div className="blogsCon !mb-2">
            <Blog/>
        </div>
    </div>
  )
}

export default Blogs