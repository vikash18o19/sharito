"use client";

import ConversationList from "./components/ConversationList";
import MessageList from "./components/MessageList";
import SearchUsers from "./components/SearchUsers";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Send from "./components/Send";
import io from "socket.io-client";

var socket;

const ChatPage = () => {
  const router = useRouter();
  const handleLogout = () => {
    // Clear out the cookies
    Cookies.remove("user");
    Cookies.remove("token");
    router.push("/login");
    // Route to the /login page
  };
  const [selectedConversation, setSelectedConversation] = useState("");
  const [conversationName, setConversationName] = useState("");
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  // Fetch the user data from cookies
  const user = JSON.parse(Cookies.get("user"));
  const token = Cookies.get("token");


  useEffect(() => {
    fetchData();

    // Establish a Socket.IO connection
    socket = io(process.env.NEXT_PUBLIC_BACKEND_URI);

    // Emit a "setup" event to the server to identify the current user
    socket.emit("setup", user);

    // Listen for a "connected" event to confirm the connection is successful
    socket.on("connected", () => {
      console.log("Socket.IO connected to the server.");
      setSocketConnected(true);
    });
    socket.on("typing", () => {setIsTyping(true);console.log("another user typing in room: ",selectedConversation);});
    socket.on("stop typing", () => {setIsTyping(false); console.log("another user stopped typing in room: ",selectedConversation);});
    
    socket.on("messageRecieved", (newMessage) => {
      fetchMessages(newMessage.conversation);
      console.log("recieved message in room: ", newMessage.conversation);

    });
    // Clean up the socket connection when the component unmounts
    return () => {
      socket.off();
    };
  },[]);

//TODO: fix issue with conversations not updating


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

    } catch (error) {
      console.error("Error fetching conversations and messages:", error);
    }
  };

  


  const fetchMessages = async (conversationId) => {
    setSelectedConversation(conversationId);
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
      // console.log(messagesData);
      setMessages(messagesData.messages);
      console.log("joining room: ", selectedConversation);
      socket.emit("join chat", selectedConversation);
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
  const onSend = async (message) => {
    console.log("sending to: ", selectedConversation);
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
      const data = sendData.data;
      socket.emit("new message", data);
      console.log("sending message to room: ", selectedConversation);
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
  const typingHandler = (e) => {
  
    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedConversation);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedConversation);
        setTyping(false);
      }
    }, timerLength);
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
            fetchMessages={fetchMessages}
          />
        </div>
        {/* Right Sidebar */}
        <div className="w-3/4 p-4 overflow-y-scroll">
          {/* Message List */}
          <div>
              <div className="">
                {selectedConversation && (
                  <MessageList
                    conversation={conversationName}
                    user={user}
                    messages={messages}
                  />
                )}
              </div>
              {selectedConversation ? (
                <div className="sticky  bottom-0">
                  <Send onSend={onSend} typing = {typing} istyping={istyping} handler={typingHandler}/>
                </div>
              ) : null}
          </div>
          
        </div>
        
      </div>
    </div>
  );
};

export default ChatPage;
