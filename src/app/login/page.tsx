import Link from "next/link";

export default function LoginPage() {
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
              className="text-black rounded-2xl p-2"
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="text-black rounded-2xl p-2"
            />
            <button
              type="submit"
              className="text-xl bg-slate-900 mt-8 p-4 pl-8 pr-8 self-center rounded-2xl"
            >
              Login
            </button>
            <Link href="/signup">Sign up here</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

//  --->   /login/change-password
