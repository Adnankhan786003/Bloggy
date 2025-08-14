import React, { useEffect, useState } from 'react'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '../firebaseConfig'
import { Link } from 'react-router-dom'
import Spinner from './Spinner'
import HTMLReactParser from 'html-react-parser/lib/index'



const Blog = () => {
    const [postList, setPostList] = useState({})
    const [isloading, setisloading] = useState(false)



    useEffect(() => {
        const getPosts = async () => {
            const postsCollectionRef = collection(db, "posts")
            const orderedquery = query(postsCollectionRef, orderBy("createdAt", "desc"))
            const data = await getDocs(orderedquery);

            setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            setisloading(true)

        };

        getPosts();
    }, []);

    if (!isloading) {
        return (
            <div className='!flex !justify-center !items-center w-full'>
                <Spinner size={50} />
            </div>
        )
    }

    return (
        <>
            {postList.map((post) => {
                return (
                    <Link to={`/blog/${post.id}`} key={post.id}>
                        <div className="blog overflow-hidden" >
                            <img className='w-full h-[60%] rounded-lg !mb-2' src={post.imgUrl} alt="BlogImg" />

                            <h3 style={{ fontWeight: 'bold' }}>{post.Title}</h3>

                            <div className='text-[gray] text-[14px] w-[90%] line-clamp-3 !my-1 overflow-hidden '>
                                {HTMLReactParser(post.content)}
                            </div>
                            
                            <h2 className='!mt-1'>{post.createdAt.toDate().toDateString()}</h2>
                        </div>
                    </Link>
                )
            })}



        </>
    )
}

export default Blog