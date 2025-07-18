"use client";

import "./globals.css";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DarkModeToggle from "@/components/common/DarkModeToggle";

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className="transition-colors duration-300">
        <Provider store={store}>
          <header className="w-full px-4 py-2 flex justify-between items-center bg-[var(--bg-color)] text-[var(--text-color)] shadow-sm">
            <h1 className="text-xl font-semibold">Gemini Clone</h1>
            <DarkModeToggle />
          </header>

          <main className="bg-[var(--bg-color)] text-[var(--text-color)] min-h-screen">
            {children}
          </main>
          <ToastContainer />
        </Provider>
      </body>
    </html>
  );
}
