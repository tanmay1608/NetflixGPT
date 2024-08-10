import { createSlice } from "@reduxjs/toolkit";

const firebaseSlice = createSlice({
  name: "firebase",
  initialState: {
    movieTrailer: null,
  },
  reducers: {
    addMovieTrailer: (state, action) => {
      state.movieTrailer = action.payload;
    },
  },
});

export const { addMovieTrailer } = firebaseSlice.actions;
export default firebaseSlice.reducer;
