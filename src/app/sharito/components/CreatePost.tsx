import { useState } from "react";
import Cookies from "js-cookie";
const CreatePostModal = ({ onClose, fetchPosts }) => {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  // Function to handle post creation
  const handlePostCreate = async (e: any) => {
    e.preventDefault();
    try {
      // Get the token from cookies
      const token = Cookies.get("token");
      const user = JSON.parse(Cookies.get("user"));
      const userID = user._id;
      const creatorName = user.name;
      console.log(description, userID, creatorName);
      const response = await fetch("http://192.168.1.4:3002/api/posts/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description, userID, creatorName }),
      });
    } catch (error) {
      console.error("Error posting :", error);
    }

    await fetchPosts();
    // Close the modal
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-4 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Create Post</h2>
        <input
          type="text"
          placeholder="Enter your post description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-400 rounded-lg p-2 mb-4 w-full text-black"
        />
        <div className="mb-4">
          {/* Add image attachment feature */}
          <label
            htmlFor="image"
            className="bg-purple-800 text-white px-4 py-2 rounded-lg cursor-pointer"
          >
            Attach Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="hidden"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handlePostCreate}
            className="bg-purple-800 text-white px-4 py-2 rounded-lg mr-2"
          >
            Post
          </button>
          <button
            onClick={onClose}
            className="bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
