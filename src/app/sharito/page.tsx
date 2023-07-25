"use client";
import { useState, useEffect } from "react";

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  // Function to fetch posts from the server
  const fetchPosts = async () => {
    try {
      const response = await fetch(
        "http://localhost:3002/api/posts/fetchPosts",
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGJmMjUzMWRhZWVlMDFkNWIwMTZlMWMiLCJpYXQiOjE2OTAyNTI0MjUsImV4cCI6MTY5MDI1NjAyNX0.PprNVXhc2EyswQS0mks-L_AHn8WgGV8yYb3QVJwsUxQ`,
          },
        }
      );
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // Fetch posts on initial page load
  useEffect(() => {
    fetchPosts();
  }, []);

  // Function to handle refresh button click
  const handleRefresh = () => {
    fetchPosts();
  };

  return (
    <div className="min-h-screen bg-green-950">
      {/* Navbar */}
      <nav className="bg-purple-800 text-white p-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold">Sharito</h1>
        <div className="space-x-2">
          <button className="text-white bg-purple-700 hover:bg-purple-600 px-3 py-2 rounded">
            Chats
          </button>
          <button className="text-white bg-purple-700 hover:bg-purple-600 px-3 py-2 rounded">
            About
          </button>
          <button className="text-white bg-purple-700 hover:bg-purple-600 px-3 py-2 rounded">
            Help
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-1 items-center justify-center bg-gray-100 p-4">
        <div className="max-w-xl w-full space-y-4">
          {/* Refresh Button */}
          <button
            className="bg-purple-800 text-white py-2 px-4 rounded shadow hover:bg-purple-700 w-full sm:w-auto"
            onClick={handleRefresh}
          >
            Refresh
          </button>

          {/* Iterate through the posts and display as cards */}
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-lg shadow p-4 transition-transform transform hover:-translate-y-2"
            >
              {post.image ? (
                <img
                  src={post.image.data}
                  alt={post.description}
                  className="w-full h-44 object-cover rounded-lg mb-4"
                />
              ) : null}
              <p className="text-black font-semibold mb-2">
                {post.creatorName}
              </p>
              <p className="text-gray-600 mb-4">{post.description}</p>
              <p className="text-gray-400 text-sm">
                {new Date(post.date).toDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
