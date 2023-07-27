import React from "react";

const ConversationList = ({
  setConvName,
  conversations,
  onConversationClick,
}) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 pt-5">Conversations</h2>
      {conversations.length === 0 ? (
        <p>No conversations found.</p>
      ) : (
        <ul className="divide-y divide-gray-300">
          {conversations.map((conversation) => (
            <li
              key={conversation._id}
              className="py-2 cursor-pointer bg-gray-100 hover:bg-gray-200 p-2 text-black"
              onClick={() => {
                onConversationClick(conversation._id);
                setConvName(conversation.name);
              }}
            >
              {/* Customize the display of the conversation based on your data structure */}
              <div>{conversation.name}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ConversationList;
