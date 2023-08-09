"use client";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-8xl">Sharito</div>
      <button
        className="bg-slate-400 text-black p-5 rounded-xl mt-10 text-lg"
        onClick={() => (window.location.href = "/login")}
      >
        Get Started
      </button>
    </div>
  );
}
