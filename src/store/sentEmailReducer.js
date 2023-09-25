import { createSlice } from "@reduxjs/toolkit";

const sentEmailSlice = createSlice({
  name: "sentEmail",
  initialState: { sentEmails: [] },
  reducers: {
    replaceSentEmails: (state, action) => {
      state.sentEmails = action.payload;
    },
    addSentEmail: (state, action) => {
      state.sentEmails = [action.payload, ...state.sentEmails];
    },
    deleteSentEmail: (state, action) => {
      state.sentEmails = state.sentEmails.filter(
        (sentEmail) => sentEmail.id !== action.payload
      );
    },
  },
});

export const sentEmailActions = sentEmailSlice.actions;
export const sentEmailReducer = sentEmailSlice.reducer;
