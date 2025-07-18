"use client";
import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addChatroom, deleteChatroom } from "../../redux/chatroomsSlice";
import Link from "next/link";
import { toast } from "react-toastify";
import ConfirmModal from "../../components/common/confirmModal";
import debounce from "lodash.debounce";

export default function Dashboard() {
  const dispatch = useDispatch();
  const chatrooms = useSelector((state) => state.chatrooms.chatrooms);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState(null); 
  const [modalOpen, setModalOpen] = useState(false);
  const [rawSearch, setRawSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const filteredChatrooms = chatrooms.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  const createRoom = () => {
    if (!title.trim()) return;
    dispatch(addChatroom(title.trim()));
    toast.success("Chatroom created");
    setTitle("");
  };

  const openDeleteModal = (id) => {
    setDeleteId(id);
    setModalOpen(true);
  };

  const confirmDelete = () => {
    dispatch(deleteChatroom(deleteId));
    toast.info("Chatroom deleted");
    setModalOpen(false);
    setDeleteId(null);
  };

  const cancelDelete = () => {
    setModalOpen(false);
    setDeleteId(null);
  };

  const updateSearch = useCallback(
    debounce((val) => setSearch(val), 300),
    []
  );

  useEffect(() => {
    updateSearch(rawSearch);
  }, [rawSearch, updateSearch]);

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}>
      <div className="max-w-3xl mx-auto chat-container backdrop-blur-md p-8 rounded-2xl shadow-xl border border-[var(--input-border)]">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-extrabold select-none">
            💬 Your Chatrooms
          </h1>
        </div>
        <input
          type="text"
          placeholder="🔍 Search chatrooms..."
          className="w-full mb-6 p-3 border border-[var(--input-border)] bg-[var(--input-bg)] text-[var(--text-color)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] transition"
          value={rawSearch}
          onChange={(e) => setRawSearch(e.target.value)}
        />

        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <input
            type="text"
            placeholder="🆕 New chatroom title"
            className="flex-grow p-3 border border-[var(--input-border)] bg-[var(--input-bg)] text-[var(--text-color)] rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            onClick={createRoom}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-xl text-white font-semibold shadow-lg transition transform hover:scale-105 w-full sm:w-auto mx-auto sm:mx-0"
            aria-label="Create chatroom"
          >
            Create
          </button>
        </div>

        <ul className="space-y-4">
          {loading
            ? [...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse space-y-2">
                  <div className="h-5 rounded w-1/2 bg-gray-300 dark:bg-gray-700"></div>
                  <div className="h-4 rounded w-full bg-gray-300 dark:bg-gray-700"></div>
                </div>
              ))
            : filteredChatrooms.map((room) => (
                <li
                  key={room.id}
                  className="flex justify-between items-center p-4 rounded-xl bg-[var(--card-bg)] border border-[var(--input-border)] shadow-sm transition hover:scale-105 hover:bg-[var(--hover-bg)] cursor-pointer"
                >
                  <Link
                    href={`/chatroom/${room.id}`}
                    className="text-blue-400 font-semibold hover:underline"
                  >
                    {room.title}
                  </Link>
                  <button
                    onClick={() => openDeleteModal(room.id)}
                    className="text-red-500 hover:text-red-600 transition text-lg"
                  >
                    🗑️
                  </button>
                </li>
              ))}
        </ul>
      </div>

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={modalOpen}
        title="Delete Chatroom"
        message="Are you sure you want to delete this chatroom? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
}
