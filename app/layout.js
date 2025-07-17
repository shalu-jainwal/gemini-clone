"use client";

import "./globals.css";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className="transition-colors duration-300 bg-white text-black dark:bg-black dark:text-white">
        <Provider store={store}>
          {children}
          <ToastContainer />
        </Provider>
      </body>
    </html>
  );
}
