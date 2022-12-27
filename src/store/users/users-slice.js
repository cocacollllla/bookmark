import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: null,
  reducers: {
    replaceData: (state, action) => (state = action.payload),
    updateFriends: (state, action) => {
      state.friends = action.payload;
    },
    favoriteT: (state, action) => {
      state.favorite.push(action.payload);
    },
    favoriteF: (state, action) => ({
      ...state,
      favorite: state.favorite.filter((item) => item.id !== action.payload),
    }),
    updateGoal: (state, action) => {
      state.goal = action.payload;
    },
    updateName: (state, action) => {
      state.name = action.payload;
    },
    updatePhoto: (state, action) => {
      state.photoUrl = action.payload;
    },
  },
});

export const usersActions = usersSlice.actions;

export default usersSlice;
