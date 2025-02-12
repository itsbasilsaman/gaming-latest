import { createAsyncThunk } from "@reduxjs/toolkit";
import { configWithToken,axiosIn } from "../../../config/constants";


  
export const GetBrandsWithService = createAsyncThunk(
    "user/GetBrandsWithService",
    async (subServiceId:string, { rejectWithValue }) => {
      try {
        const response = await axiosIn.get(`/user/offer-listing/brands?page=1&limit=10&search&serviceId=${subServiceId}&subServiceId`,configWithToken());
       console.log("response GetBrandsWithService ", response);
        return response; 
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

export const GetOffersByBrand = createAsyncThunk(
    "user/GetOffersByBrand",
    async (subServiceId:string, { rejectWithValue }) => {
      try {
        const response = await axiosIn.get(`/user/offer-listing/brands/offers?serviceId=${subServiceId}&brandId=${subServiceId}`,configWithToken());
       console.log("response of the GetOffersByBrand ", response);
        return response; 
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
  
export const GetOffersDetail = createAsyncThunk(
    "user/GetOffersDetail",
    async (subServiceId:string, { rejectWithValue }) => {
      try {
        const response = await axiosIn.get(`/user/offer-listing/offer-details?offerId=${subServiceId}`,configWithToken());
       console.log("response of the GetOffersDetail ", response);
        return response; 
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
  