import { createSlice } from "@reduxjs/toolkit";

const errorSlice = createSlice({
  name: "error",
  initialState: {
    fetchError: null,
    searchError: null,
  },
  reducers: {
    setFetchError: (state, action) => {
      state.fetchError = action.payload;
    },
    setSearchError: (state, action) => {
      state.searchError = action.payload;
    },
  },
});

export const { setFetchError, setSearchError } = errorSlice.actions;
export default errorSlice.reducer;
