import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import chatroomsReducer from "./chatroomsSlice";
import chatReducer from "./chatSlice";
import { loadState, saveState } from "../utils/localStorage";

const persistedState = loadState();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chatrooms: chatroomsReducer,
    chat: chatReducer,
  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState(store.getState());
});
