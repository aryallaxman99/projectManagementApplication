import { createSlice } from "@reduxjs/toolkit";
export const initialState = {
  name: "",
  email: "",
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
    resetUserDetails: (state, actions) => {
      state.name = "";
      state.email = "";
      state.userRole = "";
    },
  },
});

export const { setUserDetails, resetUserDetails } = userSlice.actions;
export default userSlice.reducer;
