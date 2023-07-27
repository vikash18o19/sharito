import React, { useState } from "react";

const SearchUsers = ({ onSearch, searchResults }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Handle user search
  const handleSearch = () => {
    onSearch(searchQuery); // Call the onSearch prop with the search query
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Search Users</h2>
      <div className="flex">
        <input
          type="text"
          className="border border-gray-400 px-2 py-1 w-full rounded text-black"
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
      {searchResults.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul className="divide-y divide-gray-300">
          {searchResults.map((user) => (
            <li key={user._id} className="py-2">
              {/* Customize the display of search results based on your data structure */}
              <div>{user.name}</div>
              <div>{user.email}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchUsers;
