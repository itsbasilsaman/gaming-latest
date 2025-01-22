
import axios  from "axios";
import { URL,config } from "../../../config/constants";
import { ILoginUser } from "../../../interfaces/user/userLoginInterfaces";
import { IVerifyOtp } from "../../../interfaces/user/userLoginInterfaces";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserSignup } from '../../../interfaces/user/userSignupInterface';


export const axiosIn = axios.create({
    baseURL: URL,
  });




  interface VerifyOtpResponse {
    success: boolean;
    data?: {
      accessToken?: string;
      refreshToken?: string;
    };
    message?: string;
  }
  

  
  export const loginUser = createAsyncThunk( "user/send-otp",
    async (userCredentials:ILoginUser,{rejectWithValue})=>{
        try {
            const data  = await axiosIn.post(`/send-otp`,userCredentials, config );
            return data
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

  export const verifiyOtpUser = createAsyncThunk( "user/verify-otp",
    async (userCredentials:IVerifyOtp,{rejectWithValue})=>{
        try {
          console.log("this is verify otp action ", userCredentials);
          
          const response = await axiosIn.post<VerifyOtpResponse>(`/verify-otp`,userCredentials, config );

            console.log("verirf action _______sds___***____",response.data);
            
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


  export const SignupUser= createAsyncThunk( "user/SignupUser",
    async (userCredentials:UserSignup,{rejectWithValue})=>{
        try {
          console.log("4444444data for user signup the data ___", userCredentials);
            const  response = await axiosIn.post(`/create-account`,userCredentials, config );
            console.log("the filled data of the signup ", response.data );
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



    
export const userLogout = createAsyncThunk(
  "user/logout",
  async (__, { rejectWithValue }) => {
    try {
       axiosIn.delete(`/logout`, config )
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ message: "Something went wrong!" });
      }
    }
  }
);

