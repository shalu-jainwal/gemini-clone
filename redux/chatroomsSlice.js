import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  chatrooms: [],
};

const chatroomsSlice = createSlice({
  name: "chatrooms",
  initialState,
  reducers: {
    addChatroom(state, action) {
      const newRoom = {
        id: nanoid(),
        title: action.payload,
      };
      state.chatrooms.push(newRoom);
    },
    deleteChatroom(state, action) {
      state.chatrooms = state.chatrooms.filter(
        (room) => room.id !== action.payload
      );
    },
  },
});

export const { addChatroom, deleteChatroom } = chatroomsSlice.actions;
export default chatroomsSlice.reducer;
