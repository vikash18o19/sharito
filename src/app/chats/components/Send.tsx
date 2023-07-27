"use client";
import React, { useState } from "react";

const Send = ({ onSend }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    onSend(message);
    setMessage("");
  };

  return (
    <div className="flex">
      <input
        type="text"
        className="border border-gray-400 px-2 py-1 w-full rounded text-black"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 ml-2 rounded"
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  );
};

export default Send;
