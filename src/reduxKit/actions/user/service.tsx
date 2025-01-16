import { createAsyncThunk } from "@reduxjs/toolkit";
import axios  from "axios";
import { URL,config } from "../../../config/constants";
export const axiosIn = axios.create({
    baseURL: URL,
  });


  
export const userServiceAction = createAsyncThunk(
    "user/userService",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axiosIn.get(`/api/v1/admin/service`,config);
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