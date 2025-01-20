/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

import { loginUser } from "../../actions/auth/authAction";
import { userLogout } from "../../actions/auth/authAction";
import { verifiyOtpUser } from "../../actions/auth/authAction";
import { SignupUser } from "../../actions/auth/authAction";

export interface UserState {
  userData: UserState | null;
  error: string | null;
  loading: boolean;
  isLogged: boolean;
  _id?: string | null;
  accessToken?: string | null;
  refreshToken?: string | null;
}

// const safeParse = (key: string, fallback: any = null) => {
//   const value = localStorage.getItem(key);
//   try {
//     return value ? JSON.parse(value) : fallback;
//   } catch (error) {
//     console.log("Error while parsing local storage value for key: ", error);

//     return fallback;
//   }
// };

// const initialState: UserState = {
//   userData: safeParse("user"),
//   error: null,
//   loading: false,
//   isLogged: safeParse("role"),
//   _id: safeParse("_id"),
//   accessToken: safeParse("accessToken"),
//   refreshToken: safeParse("refreshToken"),
// };

const initialState: UserState = {
  userData: (() => {
    try {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  })(),
  error: null,
  loading: false,
  isLogged: (() => {
    try {
      const isLogged = localStorage.getItem("isLogged");
      return isLogged ? JSON.parse(isLogged) : false;
    } catch {
      return false;
    }
  })(),
  _id: (() => {
    try {
      const _id = localStorage.getItem("_id");
      return _id ? JSON.parse(_id) : null;
    } catch {
      return null;
    }
  })(),
  accessToken: (() => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      return accessToken ? JSON.parse(accessToken) : null;
    } catch {
      return null;
    }
  })(),
  refreshToken: (() => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      return refreshToken ? JSON.parse(refreshToken) : null;
    } catch {
      return null;
    }
  })(),
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
        console.log("user login payload", payload);

        state.loading = false;
        state.error = null;
        state.isLogged = true;
        localStorage.setItem("isLogged", JSON.stringify(state.isLogged));
        localStorage.setItem("user", JSON.stringify(state.userData));
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.userData = null;
        state.error = payload as string;
      })










      .addCase(verifiyOtpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifiyOtpUser.fulfilled, (state, { payload }) => {
        console.log("user verify otp  payload", payload);
        state.loading = false;
        state.error = null;
        console.log("user verify otp  payload one ", payload.data);
        state.isLogged = true;
        state.refreshToken = payload.data.refreshToken;
        state.accessToken = payload.data.accessToken;
        console.log("user verify otp  payload", payload.data.accessToken);
        state.accessToken = payload.data.refreshToken;
        localStorage.setItem(
          "refreshToken",
          JSON.stringify(state.refreshToken)
        );
        localStorage.setItem("accessToken", JSON.stringify(state.accessToken));
        localStorage.setItem("isLogged", JSON.stringify(state.isLogged));
        localStorage.setItem("user", JSON.stringify(state.userData));
      })
      .addCase(verifiyOtpUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.userData = null;
        state.error = payload as string;
      })




      .addCase(userLogout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(userLogout.fulfilled, (state) => {
        state.loading = false;
        state.isLogged = false;
        state.error = null;
        state.userData = null;
        localStorage.clear();
      })
      .addCase(userLogout.rejected, (state, { payload }) => {
        state.loading = false;
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
      });
  },
});

export const { updateError } = authSlice.actions;
export default authSlice;
