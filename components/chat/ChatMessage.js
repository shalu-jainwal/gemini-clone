"use client";

import { toast } from "react-toastify";

export default function ChatMessage({ msg }) {
  const isUser = msg.sender === "user";
  return (
    <div
      className={`p-4 rounded-2xl max-w-[75%] break-words ${
        isUser
          ? "bg-blue-600 ml-auto text-white shadow-md"
          : "bg-gray-700 text-white shadow-inner"
      }`}
    >
      {msg.image && (
        <img
          src={msg.image}
          alt="Sent image"
          className="mb-2 rounded max-h-64 object-contain"
        />
      )}
      <p>{msg.text}</p>
      <div className="text-xs text-gray-300 mt-1 flex justify-between">
        <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
        <button
          onClick={() => {
            navigator.clipboard.writeText(msg.text);
            toast.success("Copied to clipboard");
          }}
          className="hover:underline text-blue-300"
          aria-label="Copy message"
        >
          Copy
        </button>
      </div>
    </div>
  );
}
