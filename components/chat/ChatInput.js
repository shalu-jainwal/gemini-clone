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
    <div className="mt-6 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
      <input
        type="text"
        placeholder="💬 Type your message..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendWithImage()}
        className="flex-grow p-3 rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] transition"
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
        className="cursor-pointer bg-[var(--input-bg)] p-2 rounded border border-[var(--input-border)] text-[var(--text-color)] hover:bg-[var(--hover-bg)] transition select-none flex items-center justify-center"
        aria-label="Upload image"
      >
        📷
      </label>
      <button
        onClick={sendWithImage}
         className="bg-[var(--accent-color)] hover:bg-blue-700 px-6 py-3 rounded-xl text-white font-semibold shadow-lg transition transform hover:scale-105"
        aria-label="Send message"
      >
        Send
      </button>
      {imagePreview && (
        <img
          src={imagePreview}
          alt="Preview"
          className="h-16 rounded ml-2 object-cover border border-[var(--input-border)]"
        />
      )}
    </div>
  );
}
