import React, { useState, useRef,useMemo } from 'react';
import { db, auth } from '../firebaseConfig'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import JoditEditor from 'jodit-react';



const CreatePost = ({ placeholder }) => {

  const [Title, setTitle] = useState("")
  const [imgUrl, setimgUrl] = useState("")
  const editor = useRef(null);
  const [content, setContent] = useState('');

  const collectionRef = collection(db, "posts")

  let navigate = useNavigate()

  const handleImageUpload = async (event) => {
    const file = event.target.files[0]

    if (!file) return

    const data = new FormData()
    data.append("file", file)
    data.append("upload_preset", "Bloggy-posts")
    data.append("cloud_name", "dljcvwzth")

    const res = await fetch("https://api.cloudinary.com/v1_1/dljcvwzth/image/upload", {
      method: "POST",
      body: data
    })

    const imageURL = await res.json()


    if (!imageURL.url) {
      return alert("Image upload failed. Try again.");
    }

    console.log(imageURL.url)
    setimgUrl(imageURL.url)
  }


  const createPost = async () => {

    if (!Title || !content || !imgUrl) {
      return alert("every field is required")
    }

    await addDoc(collectionRef, {
      Title,
      content,
      imgUrl,
      author: {
        name: auth.currentUser.displayName,
        id: auth.currentUser.uid
      },
      createdAt: serverTimestamp(),

    })

    navigate("/")

  }
  return (
    <div>
      <Navbar />

      <div className='createPostPage'>

        <div className="cpContainer ">
          <h1>Create a Post </h1>

          <div className="inputGp">
            <label>Title</label>
            <input type="text" placeholder='BlogOne' onChange={(e) => setTitle(e.target.value)} />
          </div>

          {/* <div className="inputGp ">
            <label htmlFor="">Post:</label>
            <textarea rows={20} placeholder='Content' onChange={(e) => setPostText(e.target.value)}  />
           
          </div> */}

          <label htmlFor="">Posts: </label>
          <JoditEditor
            ref={editor}
            value={content}
            onChange={newContent => setContent(newContent)} 
            className='text-black'
            tabIndex={1}
          />

          <div className="inputGp">
            <label htmlFor="file-upload" >
              Choose PNG or JPEG for posts
            </label>
            <input className="btnWhite !text-blue-600 cursor-pointer"
              id="file-upload"
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleImageUpload}
            // style={{ display: "none" }}
            />
          </div>

          <button onClick={createPost} className='submitBtn'>Submit Post</button>
        </div>
      </div>

    </div>
  )
}

export default CreatePost