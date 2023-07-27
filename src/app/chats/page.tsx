"use client";

import Head from "next/head";
import ConversationList from "./components/ConversationList";
import MessageList from "./components/MessageList";
import SearchUsers from "./components/SearchUsers";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { set } from "mongoose";
import Send from "./components/Send";

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
  const [conversationName, setConversationName] = useState("");
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  // Fetch the user data from cookies
  const user = JSON.parse(Cookies.get("user"));
  const token = Cookies.get("token");

  const fetchData = async () => {
    try {
      // Fetch conversations
      const conversationsResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/messages/getConv`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const conversationsData = await conversationsResponse.json();
      setConversations(conversationsData.conversations);
      console.log(conversationsData.conversations);
      // Fetch messages for the first conversation (if available)
      // if (conversationsData.conversations.length > 0) {
      //   const firstConversationId = conversationsData.conversations[0]._id;
      //   await fetchMessages(firstConversationId);
      // }
    } catch (error) {
      console.error("Error fetching conversations and messages:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const fetchMessages = async (conversationId) => {
    try {
      const messagesResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/messages/${conversationId}/getMessages`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const messagesData = await messagesResponse.json();
      console.log(messagesData);
      setMessages(messagesData.messages);
      setSelectedConversation(conversationId);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Function to search users and fetch search results
  const handleSearch = async (query) => {
    try {
      const searchResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/user/search?query=${query}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const searchData = await searchResponse.json();
      setSearchResults(searchData.users);
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };
  const onSend = async (message: string) => {
    try {
      const sendResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/messages/${selectedConversation}/sendMessage`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content: message }),
        }
      );

      const sendData = await sendResponse.json();
      fetchMessages(selectedConversation);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const startConversation = async (name, receiverId) => {
    try {
      console.log(receiverId, name);
      const sendResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/messages/createConv`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            participants: [user._id, receiverId],
          }),
        }
      );
      const sendData = await sendResponse.json();

      if (sendResponse.status === 201) {
        console.log(sendData);
        fetchData();
      } else {
        console.log(sendData);
      }
    } catch (error) {}
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
      <div className="flex h-screen bg-slate-600">
        {/* Left Sidebar */}
        <div className="w-1/4 border-r border-gray-300 p-5">
          {/* Search Users */}
          <SearchUsers
            onSearch={handleSearch}
            searchResults={searchResults}
            setSearchResults={setSearchResults}
            startConversation={startConversation}
          />
          {/* Conversation List */}
          <ConversationList
            setConvName={setConversationName}
            conversations={conversations}
            onConversationClick={fetchMessages}
          />
        </div>
        {/* Right Sidebar */}
        <div className="w-3/4 p-4">
          {/* Message List */}
          {selectedConversation && (
            <MessageList
              conversation={conversationName}
              user={user}
              messages={messages}
            />
          )}
        </div>
        <div className="fixed w-screen right-0 bottom-0">
          <Send onSend={onSend} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
