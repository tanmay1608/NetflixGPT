import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    trailerVideo: null,
    popularMovies: null,
    topRatedMovies: null,
    upcomingMovies: null,
    searchedMovies: {
      movieName: null,
      movieResult: null,
    },
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
    addUpcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload;
    },
    addSearchedMovies: (state, action) => {
      state.searchedMovies.movieName = action.payload.movieName;
      state.searchedMovies.movieResult = action.payload.movieResult;
    },
    removeSearchedMovies: (state) => {
      state.searchedMovies.movieName = null;
      state.searchedMovies.movieResult = null;
    },
    clearMovieSlice: (state) => {
      const newState = {
        nowPlayingMovies: null,
        trailerVideo: null,
        popularMovies: null,
        topRatedMovies: null,
        upcomingMovies: null,
        searchedMovies: {
          movieName: null,
          movieResult: null,
        },
      };

      return newState;
    },
  },
});

export const {
  addNowPlayingMovies,
  addTrailerVideo,
  addPopularMovies,
  addTopRatedMovies,
  addUpcomingMovies,
  addSearchedMovies,
  removeSearchedMovies,
  clearMovieSlice,
} = movieSlice.actions;
export default movieSlice.reducer;
