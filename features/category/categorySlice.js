import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [],
  subCategories: []
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setSubCategories: (state, action) => {
      state.subCategories = action.payload;
    }
  },
  extraReducers: {
    
  }
});

// Action creators are generated for each case reducer function
export const { setCategories, setSubCategories } = categorySlice.actions;

export const selectCategories = state => state.category.categories;
export const selectSubCategories = state => state.category.subCategories;

export default categorySlice.reducer;
