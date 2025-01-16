import { createSlice } from '@reduxjs/toolkit';
import { userServiceAction } from '../../actions/user/service';


interface Service {
    icon: string; // Update based on your API response
    ServiceName: string;
  }

interface ServicesState {
    services: Service[];
    loading: boolean;
    error: string | null;
  }
  
  const initialState: ServicesState = {
    services: [],
    loading: false,
    error: null,
  };

const servicesSlice = createSlice({
    name: 'services',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
      builder
        .addCase(userServiceAction.pending, (state) => {
          state.loading = true;
          state.error = null;
        })

        .addCase(userServiceAction.fulfilled, (state, action) => {
            state.error=null
          state.loading = false;
          state.services = action.payload;
          console.log("this console form service slice , payload ", action.payload);
        })
        .addCase(userServiceAction.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });
    }
})

export default servicesSlice.reducer;