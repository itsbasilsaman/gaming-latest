/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { configWithToken,axiosIn } from "../../../config/constants";
import { getProduct } from "../../../components/pages/Seller/offerDetail";


export const GetServicesWithSubservices= createAsyncThunk(
    "user/offer/services-with-subservices",
    async (__,{rejectWithValue})=>{
        try {

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
export const GetProducetsForCreateOffer= createAsyncThunk(
    "user/offer/GetProducetsForCreateOffer",
    async (ids:getProduct,{rejectWithValue})=>{
        try {
            const response = await axiosIn.get(`/seller/offer/products?serviceId=${ids.SelectedServiceId}&subServiceId?=${ids?.SelectedSubServiceId}&brandId=${ids.selectedBrandId}`,configWithToken());
            return response.data
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          }  catch (error: any) {
            if (error.response && error.response.data) {
              return rejectWithValue(error.response.data.message);
            } else {
              return rejectWithValue({ message: "Something went wrong!" });
            }
          }
        }
    
  )

  export const CreateOfferWithProduct = createAsyncThunk(
    "user/offer/CreateOfferWithProduct",
    async (formData: FormData, { rejectWithValue }) => {
      try {
        const convertedData: Record<string, any> = {};
  
        // Convert FormData to a regular object
        for (const [key, value] of formData.entries()) {
          if (["unitPriceUSD", "unitPriceSAR", "minQty", "apiQty", "lowStockAlertQty"].includes(key)) {
            convertedData[key] = Number(value); // Convert these fields to numbers
          } else if (key === "salesTerritory") {
            convertedData[key] = JSON.parse(value as string); // Convert JSON string to an object
          } else if (key === "deliveryMethods") {
            convertedData[key] = JSON.parse(value as string); // Convert JSON string to an array
          } else {
            convertedData[key] = value;
          }
        }
  
        console.log("Converted Offer Data:", convertedData);
  
        const response = await axiosIn.post(
          `/seller/offer/create-offer`,
          convertedData,
          configWithToken()
        );
  
        console.log("Create Offer Response:", response.data);
  
        return response.data;
      } catch (error: any) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data.message);
        } else {
          return rejectWithValue({ message: "Something went wrong!" });
        }
      }
    }
  );
  