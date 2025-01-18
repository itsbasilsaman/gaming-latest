import { createSlice } from "@reduxjs/toolkit";

import { loginUser } from "../../actions/auth/authAction";
import { SignupUser } from "../../actions/auth/authAction";

export interface UserState {
  userData: UserState | null; 
  error: string | null;
  loading: boolean;
  isLogged: boolean;
  _id?: string | null;
}




const initialState: UserState = {
  userData: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null,
  error: null,
  loading: false,
  isLogged: localStorage.getItem("isLogged")
    ? JSON.parse(localStorage.getItem("isLogged")!)
    : false,
  _id: localStorage.getItem("_id")
    ? JSON.parse(localStorage.getItem("_id")!)
    : null,
};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateError: (state, { payload }) => {
      state.error = payload;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.userData = payload;
        state.isLogged = true;
        localStorage.setItem("isLogged", JSON.stringify(state.isLogged));
        localStorage.setItem("user", JSON.stringify(state.userData));
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.userData = null;
        state.error = payload as string;
      })




    .addCase(SignupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(SignupUser.fulfilled, (state, { payload }) => {
        console.log("the signup pay load ", payload);
        state.loading = false;
        state.error = null;
        state.userData = payload;
        state.isLogged = true;
        localStorage.setItem("isLogged", JSON.stringify(state.isLogged));
        localStorage.setItem("user", JSON.stringify(state.userData));
      })
      .addCase(SignupUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.userData = null;
        state.error = payload as string;
      })

  },
});

export const {updateError}= authSlice.actions
export default authSlice
