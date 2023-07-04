"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignUpPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    name: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const onSignup = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("api/users/signup", user);
      if (data.status === 200) {
        alert(data.message);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col p-8 pl-20 pr-20 rounded-3xl  bg-gray-800">
        <h1 className="self-center p-5 text-2xl">Login Form</h1>
        <form className="" action="">
          <div className="flex flex-col gap-4">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="text-black rounded-2xl p-2"
            />
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="text-black rounded-2xl p-2"
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="text-black rounded-2xl p-2"
            />
            <button
              type="submit"
              onClick={onSignup}
              className="text-xl bg-slate-900 mt-8 p-4 pl-8 pr-8 self-center rounded-2xl"
            >
              SignUp
            </button>
            {loading && <p>Loading...</p>}
            <Link href="/login">Login instead</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
