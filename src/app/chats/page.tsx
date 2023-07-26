"use client";

import Head from "next/head";
import ConversationList from "./components/ConversationList";
import MessageList from "./components/MessageList";
import SearchUsers from "./components/SearchUsers";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const ChatPage = () => {
  const router = useRouter();
  const handleLogout = () => {
    // Clear out the cookies
    Cookies.remove("user");
    Cookies.remove("token");
    router.push("/login");
    // Route to the /login page
  };
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  // Fetch the user data from cookies
  const user = JSON.parse(Cookies.get("user"));

  useEffect(() => {
    // Fetch conversations and messages here using fetch
    // Use async function to fetch data
    const fetchData = async () => {
      try {
        // Fetch conversations
        const conversationsResponse = await fetch("/api/conversations", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const conversationsData = await conversationsResponse.json();
        setConversations(conversationsData.conversations);

        // Fetch messages for the first conversation (if available)
        if (conversationsData.conversations.length > 0) {
          const firstConversationId = conversationsData.conversations[0]._id;
          await fetchMessages(firstConversationId);
        }
      } catch (error) {
        console.error("Error fetching conversations and messages:", error);
      }
    };

    fetchData();
  }, []);

  const fetchMessages = async (conversationId) => {
    try {
      const messagesResponse = await fetch(
        `/api/conversations/${conversationId}/messages`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const messagesData = await messagesResponse.json();
      setMessages(messagesData.messages);
      setSelectedConversation(conversationId);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Function to search users and fetch search results
  const handleSearch = async (query) => {
    try {
      const searchResponse = await fetch(`/api/users/search?query=${query}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const searchData = await searchResponse.json();
      setSearchResults(searchData.users);
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  return (
    <div>
      <nav className="bg-purple-800 text-white p-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold">Sharito</h1>
        <div className="space-x-2">
          <button
            className="text-white bg-purple-700 hover:bg-purple-600 px-3 py-2 rounded"
            onClick={() => {
              router.push("/sharito");
            }}
          >
            Home
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
      <div className="flex h-screen">
        {/* Left Sidebar */}
        <div className="w-1/4 border-r border-gray-300">
          {/* Search Users */}
          <SearchUsers onSearch={handleSearch} searchResults={searchResults} />
          {/* Conversation List */}
          <ConversationList
            conversations={conversations}
            onConversationClick={fetchMessages}
          />
        </div>
        {/* Right Sidebar */}
        <div className="w-3/4 p-4">
          {/* Message List */}
          {selectedConversation && (
            <MessageList
              conversationId={selectedConversation}
              user={user}
              messages={messages}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
