
import axios  from "axios";
import { URL,config } from "../../../config/constants";

import { IAdminLogin } from "../../../interfaces/admin/login";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserSignup } from '../../../interfaces/user/userSignupInterface';

export const axiosIn = axios.create({
    baseURL: URL,
  });

  


  
  export const loginAdmin= createAsyncThunk( "admin/login",
    async (adminCredentials:IAdminLogin,{rejectWithValue})=>{
        try {
            const { data } = await axiosIn.post(`/admin/login`,adminCredentials, config );
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
            const { data } = await axiosIn.post(`/admin/`,userCredentials, config );
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