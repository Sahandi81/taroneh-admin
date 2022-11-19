import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  admin: false,
  uploadImageToken: null
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.admin = true;
      state.uploadImageToken = action.payload;
    },
    clearCredentials: (state) => {
      state.admin = false;
      state.uploadImageToken = null;
    }
  },
  extraReducers: {
    
  }
});

// Action creators are generated for each case reducer function
export const { setCredentials, clearCredentials } = adminSlice.actions;

export const selectAdmin = state => state.admin.admin;
export const selectUploadImageToken = state => state.admin.uploadImageToken

export default adminSlice.reducer;
