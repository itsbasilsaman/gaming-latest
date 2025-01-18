
import axios  from "axios";
import { URL,config } from "../../../config/constants";

import { ILoginUser } from "../../../interfaces/user/userLoginInterfaces";
import { IVerifyOtp } from "../../../interfaces/user/userLoginInterfaces";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserSignup } from '../../../interfaces/user/userSignupInterface';

export const axiosIn = axios.create({
    baseURL: URL,
  });

  


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
            const { data } = await axiosIn.post(`/verify-otp`,userCredentials, config );
            return data.data;
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
          console.log("4444444data for user login", userCredentials);
            const { data } = await axiosIn.post(`/user/`,userCredentials, config );
            return data.data;
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