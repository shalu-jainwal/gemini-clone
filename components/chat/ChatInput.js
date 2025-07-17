"use client";
import { useState } from "react";

export default function ChatInput({ inputText, setInputText, sendMessage }) {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const sendWithImage = () => {
    if (!inputText.trim() && !imagePreview) return;
    sendMessage(inputText.trim(), imagePreview);
    setInputText("");
    setImagePreview(null);
  };

  return (
    <div className="mt-6 flex gap-3 items-center">
      <input
        type="text"
        placeholder="💬 Type your message..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendWithImage()}
        className="flex-grow p-3 rounded-xl bg-gray-800/60 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        aria-label="Message input"
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
        id="image-upload"
      />
      <label
        htmlFor="image-upload"
        className="cursor-pointer bg-gray-700 p-2 rounded text-white hover:bg-gray-600 transition select-none"
        aria-label="Upload image"
      >
        📷
      </label>
      <button
        onClick={sendWithImage}
        className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl text-white font-semibold shadow-lg transition transform hover:scale-105"
        aria-label="Send message"
      >
        Send
      </button>
      {imagePreview && (
        <img
          src={imagePreview}
          alt="Preview"
          className="h-16 rounded ml-2 object-cover"
        />
      )}
    </div>
  );
}
