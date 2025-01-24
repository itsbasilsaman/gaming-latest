import { createAsyncThunk } from "@reduxjs/toolkit";
import axios  from "axios";
import { URL,configWithToken } from "../../../config/constants";
export const axiosIn = axios.create({
    baseURL: URL,
  });


  
export const userProfile = createAsyncThunk(
    "user/userProfile",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axiosIn.get(`/user/profile`,configWithToken());
        console.log("my profile got from api and the data ais the ", response.data)
        return response.data; 
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