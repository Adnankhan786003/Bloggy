import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useParams } from 'react-router-dom';
import Skeleton from '../components/Skeleton';
import parse from 'html-react-parser';


const SingleBlog = () => {
  const { blogid } = useParams();
  const [blogData, setBlogData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const docRef = doc(db, 'posts', blogid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setBlogData(docSnap.data());
        //   console.log(docSnap.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.log('Error fetching blog:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [blogid]);

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen w-full'>
        <Skeleton />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="single-blog !px-[100px] !mt-4">
        <div className="flex w-full min-h-[300px]  !pt-5 ">
          <div className="left w-[30%] h-full ">
            <img
              className="w-full rounded-lg"
              src={blogData.imgUrl}
              alt="Blogimage"
            />
          </div>

          <div className="!ml-4">
            <h3 className="text-6xl font-[500]">{blogData.Title}</h3>
            <p className="text-gray-500 text-[14px] !my-3">
              {blogData.createdAt?.toDate?.().toDateString?.()}
            </p>
          </div>
        </div>

        <div className="mt-6 overflow-ellipsis">
          {parse(blogData.content || '')}
        </div>
      </div>
    </>
  );
};

export default SingleBlog;