import { createSlice } from '@reduxjs/toolkit';
import { SellerRegistrationAction } from '../../actions/seller/seller';



interface ServicesState {

    loading: boolean;
    error: string | null;
  }
  
  const initialState: ServicesState = {
    loading: false,
    error: null,
  };

 export const SellerSlice = createSlice({
    name: 'selling',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
      builder
        .addCase(SellerRegistrationAction.pending, (state) => {
          state.loading = true;
          state.error = null;
        })

        .addCase(SellerRegistrationAction.fulfilled, (state, action) => {
            state.error=null
          state.loading = false;
          
          console.log("this console form service slice , payload ", action.payload);
        })
        .addCase(SellerRegistrationAction.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });
    }
})

