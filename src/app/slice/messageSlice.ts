import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface MessageItem {
  id: string;
  text: string;
}

interface MessageState {
  list: MessageItem[];
}

const initialState: MessageState = {
  list: [],
};

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<MessageItem>) => {
      state.list.push(action.payload);
    },
    removeMessage: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((msg) => msg.id !== action.payload);
    },
    clearMessages: (state) => {
      state.list = [];
    },
  },
});

export const { addMessage, removeMessage, clearMessages } =
  messageSlice.actions;
export default messageSlice.reducer;
