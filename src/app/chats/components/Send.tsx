"use client";
import React, { useState } from "react";

const Send = ({ onSend, typing, istyping, handler }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message == "") return;
    onSend(message);
    setMessage("");
  };
  const subHandler = (e) => {
    console.log(typing);
    console.log(istyping);
    handler(e);
    setMessage(e.target.value);
  };

  return (
    <div className="flex">
      {istyping == true ? (
        <div className="bg-black text-white">Typing...</div>
      ) : null}
      <input
        type="text"
        className="border border-gray-400 px-2 py-1 w-full rounded text-black"
        placeholder="Type a message..."
        value={message}
        onChange={subHandler}
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
