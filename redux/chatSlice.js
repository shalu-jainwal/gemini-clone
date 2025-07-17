import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messagesByRoom: {},
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage(state, action) {
      const { chatroomId, message } = action.payload;
      if (!state.messagesByRoom[chatroomId]) {
        state.messagesByRoom[chatroomId] = [];
      }
      state.messagesByRoom[chatroomId].push(message);
    },
    loadOldMessages(state, action) {
      const { chatroomId, messages } = action.payload;
      if (!state.messagesByRoom[chatroomId]) {
        state.messagesByRoom[chatroomId] = [];
      }
      state.messagesByRoom[chatroomId] = [
        ...messages,
        ...state.messagesByRoom[chatroomId],
      ];
    },
  },
});

export const { addMessage, loadOldMessages } = chatSlice.actions;
export default chatSlice.reducer;
