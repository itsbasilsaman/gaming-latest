 
import { getUserProfile } from "../../actions/user/userProfile";

 
 
import { createSlice,  } from "@reduxjs/toolkit";
 

 
 
export interface ProfileLoadingStatus {
  error: string | null;
  GetProfileloading: boolean
}

const initialStateForProfileLoading:ProfileLoadingStatus = {
  error: null,
  GetProfileloading: false,
}
 
 export const ProfileSlice = createSlice({
   name: '/userProfileSlice',
   initialState: initialStateForProfileLoading,
   reducers : {
    updateError : (state, {payload})=> {
      state.error = payload;
    }
   },
   extraReducers : (builder) => {
    builder 
    .addCase(getUserProfile.pending, (state)=> {
      state.GetProfileloading = true;
      state.error = null;
    })
    .addCase(getUserProfile.fulfilled, (state , {payload}) => {
      console.log("Payload after language change:", payload);
      
      state.GetProfileloading = false;
      state.error = null;
    })
    .addCase(getUserProfile.rejected, (state , {payload}) => {
      state.GetProfileloading= false;
      state.error = payload as string;
    });
   },
 })

 export default ProfileSlice.reducer;