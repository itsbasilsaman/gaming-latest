
import { configWithToken,axiosIn } from "../../../config/constants";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { SellerDetails } from "../../../interfaces/user/seller";


  
    export const SellerRegistrationAction= createAsyncThunk( "user/SignupUser",
      async (userCredentials:SellerDetails,{rejectWithValue})=>{
          try {
              const  response = await axiosIn.post(`/seller/registeration`,userCredentials, configWithToken() );
              console.log("the filled data of the seller {}{}[}{}", response );
              return response.data;
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) { 
              if (error.response && error.response.data) {
                return rejectWithValue(error.response.data.message); 
              } else {
                return rejectWithValue({ message: "Something went wrong!" });
              }
            }
      }
    )
  
  
  
  