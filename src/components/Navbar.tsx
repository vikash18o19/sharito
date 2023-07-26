"use client";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
const router = useRouter();

const Navbar = () => {
  const handleLogout = () => {
    // Clear out the cookies
    Cookies.remove("user");
    Cookies.remove("token");
    router.push("/login");
    // Route to the /login page
  };

  return (
    <nav className="bg-purple-800 text-white p-4 flex items-center justify-between">
      <h1 className="text-lg font-semibold">Sharito</h1>
      <div className="space-x-2">
        <button
          className="text-white bg-purple-700 hover:bg-purple-600 px-3 py-2 rounded"
          onClick={() => {
            router.push("/chats");
          }}
        >
          Chats
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
  );
};

export default Navbar;
