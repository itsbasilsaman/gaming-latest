import { createAsyncThunk } from "@reduxjs/toolkit";
import { configWithToken,axiosIn } from "../../../config/constants";


export const GetServicesWithSubservices= createAsyncThunk(
    "user/offer/services-with-subservices",
    async (__,{rejectWithValue})=>{
        try {
            console.log( "user get serviceoffer/services-with-subservices ");
            const response = await axiosIn.get(`/seller/offer/services-with-subservices`,configWithToken());
            console.log("user offer/services-with-subservices ", response);
            return response.data.data;
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
export const GetBrandsBySubServiceOrService= createAsyncThunk(
    "user/offer/Get Brands By Sub Service Or Service",
    async (id:string,{rejectWithValue})=>{
        try {
            console.log( "user get Get Brands By Sub Service Or Service");
            const response = await axiosIn.get(`/seller/offer/brands?serviceId=${id}`,configWithToken());
            console.log("user /brands?serviceId=efc1198c-d04c-49f0-ad95-ba8a9ef78c95&subServiceId", response);
            return response.data.data;
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