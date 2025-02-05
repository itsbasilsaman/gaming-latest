
 import { getUserProfile } from "../../actions/user/userProfile";



import { createSlice,  } from "@reduxjs/toolkit";

export interface UserLanguageState {

    error: string | null;
    GetProfileloading: boolean;
  }
  const initialStateForLanguage: UserLanguageState = {
    error: null,
    GetProfileloading: false,
  };


  
export const ProfileSlice = createSlice({
    name: "/userProfileSlice",
    initialState: initialStateForLanguage,
    reducers: {
      updateError: (state, { payload }) => {
        state.error = payload;
      },
    },
  

    extraReducers: (builder) => {
      builder
        .addCase(getUserProfile.pending, (state) => {
          state.GetProfileloading = true;
          state.error = null;
        })
        .addCase(getUserProfile.fulfilled, (state, { payload }) => {
          console.log("Payload after language change:", payload);
          state.GetProfileloading = false;
          state.error = null;
        
       
        })
        .addCase(getUserProfile.rejected, (state, { payload }) => {
          state.GetProfileloading = false;
          state.error = payload as string;
        });
    },
  });
  
  export default ProfileSlice.reducer;