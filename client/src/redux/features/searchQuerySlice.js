

import { createSlice } from "@reduxjs/toolkit";

export const searchQuerySlice = createSlice({
  name: "Query",
  initialState: {
    query: ""
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    }
  }
});

export const {
  setQuery
} = searchQuerySlice.actions;

export default searchQuerySlice.reducer;