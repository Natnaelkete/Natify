import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  user: [],
  isLoggedIn: false,
};

function getItemsFormLocalStorage() {
  return JSON.parse(localStorage.getItem("user")) || initialState;
}

const userSlice = createSlice({
  name: "user",
  initialState: getItemsFormLocalStorage(),
  reducers: {
    registerUser(state, action) {
      state.user.push(action.payload);
      localStorage.setItem("user", JSON.stringify(state));
    },
    loginUser(state, action) {
      const correctEmail = state.user.find(
        (name) => name.email === action.payload.email
      );
      const correctPassword = state.user.find(
        (name) => name.password === action.payload.password
      );
      if (correctEmail && correctPassword) {
        state.isLoggedIn = true;
        toast.success("Welcome user");
      } else {
        toast.error("Username or password is incorrect");
      }
      localStorage.setItem(
        "user",
        JSON.stringify({ user: state.user, isLoggedIn: true })
      );
    },
    logoutUser(state) {
      state.user = [];
      state.isLoggedIn = false;
      localStorage.removeItem("user");
    },
  },
});

export const { registerUser, loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
