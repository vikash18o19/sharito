import React from "react";

const MessageList = ({ conversation, user, messages }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">{conversation}</h2>
      {messages.length === 0 ? (
        <p>No messages found.</p>
      ) : (
        <ul className="divide-y divide-gray-300">
          {messages.map((message) => (
            <li
              key={message._id}
              className={`py-2 px-2 my-2 ${
                message.sender._id === user._id
                  ? "bg-blue-200 text-right pr-2"
                  : "bg-purple-200"
              }`}
            >
              <div className="text-sm text-black mb-2">{message.content}</div>
              <div className="text-xs text-slate-800">
                {message.sender._id === user._id ? "You" : "Other User"} •{" "}
                {new Date(message.createdAt).toLocaleTimeString([], {
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MessageList;
