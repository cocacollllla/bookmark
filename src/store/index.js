import { configureStore } from "@reduxjs/toolkit";

import usersSlice from "./users/users-slice";

const store = configureStore({
  reducer: { users: usersSlice.reducer },
});

export default store;
