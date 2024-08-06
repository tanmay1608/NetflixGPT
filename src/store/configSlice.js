import { createSlice } from "@reduxjs/toolkit";

const configSlice=createSlice({
    name:"config",
    initialState:{
        lang:"en",
        loading:false,
        showDropdown:false,
        movieDetails:false,
        searchSection:false
    },
    reducers:{
        changeLanguage:(state,action)=>{
            state.lang=action.payload;
        },
        setLoading:(state,action)=>{
            state.loading=action.payload;
        },
        clearConfigSlice:(state)=>{
            const newState={
                lang:"en",
                loading:false,
                showDropdown:false,
                showMovieDetails:false,
                searchSection:false
            }
            return newState;
        },
        toggleDropdown:(state)=>{
            state.showDropdown=!state.showDropdown;
        },
        showMovieDetails:(state,action)=>{
            state.movieDetails=action.payload;
        },
        updateSearchSection:(state,action)=>{
            state.searchSection=action.payload
        }
    },
});

export const{changeLanguage,setLoading,clearConfigSlice,toggleDropdown,showMovieDetails,updateSearchSection} =configSlice.actions;
export default configSlice.reducer;