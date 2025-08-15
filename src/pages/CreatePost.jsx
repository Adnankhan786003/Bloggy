import React, { useState, useRef, useMemo } from 'react';
import { db, auth } from '../firebaseConfig';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import JoditEditor from 'jodit-react';


const CreatePost = ({ placeholder }) => {
  const [Title, setTitle] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const collectionRef = collection(db, "posts");

  const config = useMemo(() => ({
    placeholder: placeholder || 'Start writing...',
    height: 400,
    toolbar: true,
    toolbarAdaptive: false,
    toolbarSticky: false,

    iframe: true,
    defaultActionOnPaste: 'insert_clear_html',
    askBeforePasteHTML: false,
    pasteHTMLActionList: ['insert_clear_html', 'insert_formatted', 'insert_as_text'],
    iframeStyle: `
      body { background-color: #000000; color: #ffffff; }
      table, th, td { border: 1px solid white ; }
      a { color: #4ea3ff; }
    `
    
  }), [placeholder]);

  const navigate = useNavigate();

  const handleImageUpload = async (event) => {

    const file = event.target.files[0];
    if (!file) return;

    if (!["image/png", "image/jpeg"].includes(file.type)) {
      return setError("Only PNG and JPEG images are allowed.");
    }

    setError("");
    setLoading(true);

    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "Bloggy-posts");
      data.append("cloud_name", "dljcvwzth");

      const res = await fetch("https://api.cloudinary.com/v1_1/dljcvwzth/image/upload", {
        method: "POST",
        body: data
      });

      if (!res.ok) throw new Error("Image upload failed.");

      const imageURL = await res.json();
      if (!imageURL.url) throw new Error("Invalid Cloudinary response.");

      setImgUrl(imageURL.url);
    } catch (err) {
      setError(err.message || "Image upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const createPost = async () => {

    const plainTextContent = content.replace(/<[^>]+>/g, '').trim();

    if (!Title.trim() || !plainTextContent || !imgUrl) {
      return alert("All fields are required")
    }


    setError("");
    setLoading(true);

    try {
      await addDoc(collectionRef, {
        Title,
        content,
        imgUrl,
        author: {
          name: auth.currentUser?.displayName || "Anonymous",
          id: auth.currentUser?.uid || null
        },
        createdAt: serverTimestamp(),
      });

      navigate("/");
    } catch (err) {
      setError("Failed to create post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className='createPostPage'>
        <div className="cpContainer">
          {error && <p className="error-message text-red-600 text-center text-2xl">{error}</p>}
          <div className="inputGp">
            <label>Title</label>
            <input
              type="text"
              placeholder="BlogOne"
              value={Title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="inputGp">
            <label htmlFor="file-upload">Choose PNG or JPEG for posts</label>
            <input
              className="btnWhite !text-blue-600 cursor-pointer"
              id="file-upload"
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleImageUpload}
            />
          </div>

          <div className="inputGp">
            <label>Posts</label>
            <JoditEditor
              ref={editor}
              value={content}
              config={config}
              onBlur={(newContent) => setContent(newContent)}
              className="text-black"
              tabIndex={1}
            />
          </div>

          <button
            onClick={createPost}
            className="submitBtn"
            disabled={loading}
          >
            {loading ? "Wait..." : "Submit Post"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
