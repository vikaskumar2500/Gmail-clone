import { createSlice } from "@reduxjs/toolkit";

const inboxEmailSlice = createSlice({
  name: "inboxEmail",
  initialState: { inboxEmails: [] },
  reducers: {
    replaceInboxEmails: (state, action) => {
      state.inboxEmails = action.payload;
    },
    addInboxEmail: (state, action) => {
      state.inboxEmails = [action.payload, ...state.inboxEmails];
    },
    deleteInboxEmail: (state, action) => {
      state.inboxEmails = state.inboxEmails.filter(
        (inboxEmail) => inboxEmail.id !== action.payload
      );
    },
  },
});

export const inboxEmailActions = inboxEmailSlice.actions;
export const inboxEmailReducer = inboxEmailSlice.reducer;
