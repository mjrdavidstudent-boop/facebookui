import React, { useState, useEffect } from "react";

function App() {
  const [posts, setPosts] = useState([]);
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const backendUrl = "https://facebook-ui-kkxe.onrender.com/api/posts";

  // Fetch posts
  useEffect(() => {
    fetch(backendUrl)
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  // Submit new post
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!author || !content) {
      alert("Please fill in author and content!");
      return;
    }

    const newPost = { author, content, imageUrl };

    fetch(backendUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    })
      .then((res) => res.json())
      .then((data) => {
        setPosts([...posts, data]);
        setAuthor("");
        setContent("");
        setImageUrl("");
      })
      .catch((err) => console.error("Error posting:", err));
  };

  return (
    <div style={{ fontFamily: "Arial", maxWidth: "600px", margin: "20px auto" }}>
      <h2>Facebook-like Posts</h2>

      {/* Post form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          style={{
            width: "100%",
            marginBottom: "10px",
            padding: "8px",
            fontSize: "14px",
          }}
        />
        <textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{
            width: "100%",
            marginBottom: "10px",
            padding: "8px",
            fontSize: "14px",
            minHeight: "60px",
          }}
        ></textarea>
        <input
          type="text"
          placeholder="Image URL (optional)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          style={{
            width: "100%",
            marginBottom: "10px",
            padding: "8px",
            fontSize: "14px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 15px",
            backgroundColor: "#1877f2",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Post
        </button>
      </form>

      {/* Posts list */}
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.map((post) => (
          <div
            key={post.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
              marginBottom: "20px",
            }}
          >
            <h4>{post.author}</h4>
            <p>{post.content}</p>

            {/* ✅ Fix: properly display external image URLs */}
            {post.imageUrl && (
              <img
                src={post.imageUrl}
                alt="Post"
                style={{
                  width: "100%",
                  maxHeight: "400px",
                  objectFit: "cover",
                  borderRadius: "6px",
                  marginTop: "10px",
                }}
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            )}

            <p style={{ color: "gray", fontSize: "12px", marginTop: "8px" }}>
              Created:{" "}
              {post.createdDate
                ? new Date(post.createdDate).toLocaleString()
                : "Just now"}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
