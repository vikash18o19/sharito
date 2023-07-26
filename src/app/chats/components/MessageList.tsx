// components/MessageList.js
import React from "react";

const MessageList = ({ conversationId, user }) => {
  // Fetch and store messages for the selected conversation in state
  const messages = [];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Messages</h2>
      {/* Render the list of messages here */}
    </div>
  );
};

export default MessageList;
