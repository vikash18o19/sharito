// components/SearchUsers.js
import React, { useState } from "react";

const SearchUsers = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Handle user search
  const handleSearch = () => {
    // Fetch users based on the searchQuery using fetch
    // Store the fetched data in state to be used in rendering the search results
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Search Users</h2>
      <div className="flex">
        <input
          type="text"
          className="border border-gray-400 px-2 py-1 w-full rounded"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 ml-2 rounded"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      {/* Render the search results here */}
    </div>
  );
};

export default SearchUsers;
