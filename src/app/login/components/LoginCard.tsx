"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useState } from "react";
const LoginCard = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const onSubmit = async (e: any) => {
    e.preventDefault();
    const email = user.email;
    const password = user.password;
    // Make the POST request to sign in
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/user/signin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      // Check if sign-in was successful
      if (data.status === "SUCCESS") {
        // Save user details in cookies
        Cookies.set("user", JSON.stringify(data.data.user));
        Cookies.set("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));
        localStorage.setItem("token", data.data.token);
        // Navigate to /sharito page
        router.push("/sharito");
      } else {
        console.error("Sign-in failed:", data.message);
      }
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <div className="flex flex-col p-8 pl-20 pr-20 rounded-3xl  bg-gray-800">
      <h1 className="self-center p-5 text-2xl">Login</h1>
      <form className="">
        <div className="flex flex-col gap-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="text-black rounded-2xl p-2"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="text-black rounded-2xl p-2"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <button
            type="submit"
            onClick={onSubmit}
            className="text-xl bg-slate-900 mt-8 p-4 pl-8 pr-8 self-center rounded-2xl"
          >
            Login
          </button>
          <Link className="text-center" href="/signup">
            Sign up here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginCard;
