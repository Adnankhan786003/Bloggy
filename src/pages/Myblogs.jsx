import React, { useContext, useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Spinner from '../components/Spinner'
import HTMLReactParser from 'html-react-parser/lib/index'
import { collection, deleteDoc, doc, getDocs, orderBy, query, where } from 'firebase/firestore'
import { db } from '../firebaseConfig'
import { AuthContext } from '../context/AuthContext'

const Myblogs = () => {
    const [isloading, setisloading] = useState(false)
    const [myblogs, setmyblogs] = useState([])
    const user = useContext(AuthContext)

    const deletepost = async (id) => {
        const docRef = doc(db, "posts", id)
        await deleteDoc(docRef)
        setmyblogs(myblogs.filter((posts) => posts.id !== id))

    }



    useEffect(() => {
        const getPosts = async () => {
            if (!user) return

            const postsCollectionRef = collection(db, "posts")
            const orderedquery = query(postsCollectionRef, where("author.id", "==", user.uid))
            const data = await getDocs(orderedquery);

            setmyblogs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            setisloading(true)

        };

        getPosts();
    }, [user]);




    if (!isloading) {
        return (
            <div className='flex justify-center items-center h-screen w-full'>
                <Spinner size={100} />
            </div>
        )
    }



    return (
        <div>
            <Navbar />

            <div className='blogs !px-[100px] !mt-4 mb-[5]'>
                <h3 className="text-2xl">My Blogs</h3>
                <hr className='!my-1' />

                <div className="blogsCon !mb-2">
                    {
                        myblogs.length == 0 ?
                            <div className='w-full text-center'>
                                <h1 className='text-2xl'>Not posted yet</h1>
                            </div>    :


                            myblogs.map((post) => {
                                return (


                                    <div className="blog overflow-hidden " key={post.id} style={{ position: "relative" }}>
                                        <img className='w-full h-[60%] rounded-lg !mb-2' src={post.imgUrl} alt="BlogImg" />

                                        <h3 style={{ fontWeight: 'bold' }}>{post.Title}</h3>

                                        <div className='text-[gray] text-[14px] w-[90%] line-clamp-3 !my-1 overflow-ellipsis'>{HTMLReactParser(post.content)}</div>

                                        <div className="btn" style={{ position: "absolute", bottom: 0 }}>
                                            <button className='bg-white text-black !p-0.5 rounded w-[70px] ' onClick={() => deletepost(post.id)} >Delete</button>
                                        </div>
                                    </div>

                                )
                            })

                    }
                </div>
            </div>

        </div>
    )
}

export default Myblogs