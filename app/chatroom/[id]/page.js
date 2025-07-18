"use client";

import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMessage } from "../../../redux/chatSlice";
import { useParams } from "next/navigation";
import { simulateAIReply } from "../../../utils/simulateAIReply";
import { toast } from "react-toastify";
import { loadOldMessages } from "../../../redux/chatSlice";

import ChatMessage from "../../../components/chat/ChatMessage";
import TypingIndicator from "../../../components/chat/TypingIndicator";
import ChatInput from "../../../components/chat/ChatInput";
import ChatHeader from "../../../components/chat/ChatHeader";

export default function ChatroomPage() {
  const { id: chatroomId } = useParams();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const pageSize = 20;
  const containerRef = useRef();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // On scroll top load older messages simulation
    const onScroll = () => {
      if (containerRef.current.scrollTop === 0) {
        // Simulate fetch old messages
        const oldMessages = Array.from({ length: pageSize }, (_, i) => ({
          id: `old-${Date.now()}-${i}`,
          sender: "ai",
          text: `Old message #${i + 1 + pageSize * (page - 1)}`,
          timestamp: Date.now() - (page + 1) * 60000,
        }));
        dispatch(loadOldMessages({ chatroomId, messages: oldMessages }));
        setPage((p) => p + 1);
      }
    };

    const current = containerRef.current;
    if (current) {
      current.addEventListener("scroll", onScroll);
    }
    return () => {
      if (current) {
        current.removeEventListener("scroll", onScroll);
      }
    };
  }, [chatroomId, dispatch, page]);

  const messages = useSelector(
    (state) => state.chat.messagesByRoom[chatroomId] || []
  );
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text, image) => {
    if (!text && !image) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: text || "",
      image: image || null,
      timestamp: Date.now(),
    };

    dispatch(addMessage({ chatroomId, message: userMsg }));
    setInputText("");
    setIsTyping(true);

    try {
      const aiReply = await simulateAIReply(text || "Image received");
      dispatch(addMessage({ chatroomId, message: aiReply }));
    } catch (error) {
      toast.error("Failed to get AI reply.");
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
  const timer = setTimeout(() => {
    setLoading(false);
  }, 1500); // Simulate 1.5s loading
  return () => clearTimeout(timer);
}, []);

  return (
    <div className="min-h-screen p-6 flex flex-col max-w-4xl mx-auto" style={{ backgroundColor: "var(--chat-bg)", color: "var(--text-color)" }}
>
      <ChatHeader title={`💬 Chatroom: ${chatroomId}`} />

      <div
        ref={containerRef}
        className="flex-1 chat-container backdrop-blur-md rounded-2xl p-6 shadow-2xl overflow-y-auto border border-gray-300/30 dark:border-gray-700"
      style={{ backgroundColor: "var(--chat-bg)" }}
      >
        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-3">
          {loading ? (
            <>
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse space-y-2" style={{ color: "transparent" }}>
                  <div className="h-6 bg-gray-700 rounded w-1/3"></div>
                  <div className="h-4 bg-gray-700 rounded w-full"></div>
                  <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                </div>
              ))}
            </>
          ) : (
            <>
              {messages.map((msg) => (
                <ChatMessage key={msg.id} msg={msg} />
              ))}
              {isTyping && <TypingIndicator />}
            </>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <ChatInput
        inputText={inputText}
        setInputText={setInputText}
        sendMessage={sendMessage}
      />
    </div>
  );
}
