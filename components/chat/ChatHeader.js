"use client";

import { useRouter } from "next/navigation";

export default function ChatHeader({ title }) {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <header className="
    sticky top-0 z-40 flex items-center
    bg-white/70 dark:bg-gray-900/90 backdrop-blur-md
    border-b border-gray-300 dark:border-gray-700
    px-5 py-3 rounded-t-3xl shadow-md mb-4
  ">
      <button
        onClick={handleBack}
        aria-label="Back to dashboard"
       className="
    text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500
    transition text-2xl mr-4 select-none
  "
      >
        ←
      </button>
      <h2 className="text-2xl font-semibold truncate select-none text-gray-900 dark:text-white">{title}</h2>
    </header>
  );
}
