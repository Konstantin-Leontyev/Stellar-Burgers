import { createSlice } from "@reduxjs/toolkit";
import { getIngredients } from "./actions";

const initialState = {
  burgerIngredients: [],
  isLoading: false,
  hasError: false
}

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  selectors: {
    burgerIngredients: state => state.burgerIngredients,
    loadingStatus: state => state.isLoading,
    errorStatus: state => state.hasError
  },
  extraReducers: builder => {
    builder
      .addCase(getIngredients.pending, (state, action) =>{
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.burgerIngredients = action.payload;
        state.isLoading = false;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.hasError = action.error?.message;
        state.isLoading = false;
      })
  }
});

export const { burgerIngredients, loadingStatus, errorStatus } = ingredientsSlice.selectors;