"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import CreatePostModal from "../sharito/components/CreatePost";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();
  // Function to fetch posts from the server
  const fetchPosts = async () => {
    console.log("fetching posts", process.env.NEXT_PUBLIC_BACKEND_URI);
    try {
      // Get the token from cookies
      const token = Cookies.get("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/posts/fetchPosts`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
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

  const handleLogout = () => {
    // Clear out the cookies
    Cookies.remove("user");
    Cookies.remove("token");
    router.push("/login");
    // Route to the /login page
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Navbar */}
      <nav className="bg-purple-800 text-white p-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold">Sharito</h1>
        <div className="space-x-2">
          <button
            className="text-white bg-purple-700 hover:bg-purple-600 px-3 py-2 rounded"
            onClick={() => {
              router.push("/chats");
            }}
          >
            Chats
          </button>
          <button className="text-white bg-purple-700 hover:bg-purple-600 px-3 py-2 rounded">
            About
          </button>
          <button className="text-white bg-purple-700 hover:bg-purple-600 px-3 py-2 rounded">
            Help
          </button>
          {/* Logout Button */}
          <button
            className="text-white bg-red-600 hover:bg-red-500 px-3 py-2 rounded"
            onClick={handleLogout}
          >
            Logout
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
                  src={`data:${post.image.contentType};base64,${Buffer.from(
                    post.image.data
                  ).toString("base64")}`}
                  alt={post.description}
                  className="w-full object-cover rounded-lg mb-4"
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

          {/* + Button for Create Post */}
          <button
            className="h-20 w-20 fixed bottom-10 right-10 bg-purple-800 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 text-center text-3xl"
            onClick={() => setShowModal(true)}
          >
            +
          </button>

          {/* Create Post Modal */}
          {showModal && (
            <CreatePostModal
              onClose={() => setShowModal(false)}
              fetchPosts={fetchPosts}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
