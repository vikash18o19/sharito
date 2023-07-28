"use client";

import React, { useState, useEffect } from "react";

const SearchUsers = ({
  onSearch,
  searchResults,
  setSearchResults,
  startConversation,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [timer, setTimer] = useState(null);
  const [selection, setSelection] = useState(false); // [user, setUser
  const [name, setName] = useState(""); // [user, setUser
  const [selectedUser, setSelectedUser] = useState(null); // [user, setUser
  // Handle user search
  useEffect(() => {
    if (timer) clearTimeout(timer);

    if (inputValue) {
      const newTimer = setTimeout(() => {
        onSearch(inputValue);
      }, 1000);

      setTimer(newTimer);
    }
  }, [inputValue]);

  const handleCancel = () => {
    setInputValue("");
    setSearchResults([]);
    setSelection(false);
    setName("");
    setSelectedUser(null);
  };
  const handleClick = () => {
    startConversation(name, selectedUser._id);
    handleCancel();
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Search Users</h2>
      {selection ? (
        <div>
          <input
            type="text"
            className="border border-gray-400 px-2 py-1 w-full rounded text-black"
            placeholder="Conversation Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            className="bg-green-500 p-2 rounded-xl"
            onClick={() => {
              handleClick();
            }}
          >
            Start
          </button>
          <button className="bg-red-500 p-2 rounded-xl" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      ) : null}
      {selection != true ? (
        <div className="flex">
          <input
            type="text"
            className="border border-gray-400 px-2 py-1 w-full rounded text-black"
            placeholder="Search users..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          {inputValue != "" ? (
            <button
              className="bg-blue-500 text-white px-4 py-2 ml-2 rounded"
              onClick={handleCancel}
            >
              X
            </button>
          ) : null}
        </div>
      ) : null}
      {/* Render the search results here */}
      {searchResults.length === 0 || selection === true ? (
        <p></p>
      ) : (
        <ul className="divide-y divide-gray-300">
          {searchResults.map((user) => (
            <li
              key={user._id}
              className="py-2 bg-black text-white p-2 my-2"
              onClick={() => {}}
            >
              <div className="flex gap-4">
                <div className="flex-col">
                  <div>{user.name}</div>
                  <div>{user.email}</div>
                </div>
                <button
                  className="bg-purple-400 rounded-2xl p-2"
                  onClick={() => {
                    setSelection(true);
                    setSelectedUser(user);
                  }}
                >
                  Select
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchUsers;
