import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  name: "",
  email: "",
  token: "",
  userRole: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, actions) => {
      const { name, email, userRole } = actions.payload;
      state.name = name;
      state.email = email;
      state.userRole = userRole;
    },
  },
});

export const { setUserDetails } = userSlice.actions;
export default userSlice.reducer;
