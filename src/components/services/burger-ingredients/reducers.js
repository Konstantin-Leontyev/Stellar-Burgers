import { createSlice } from "@reduxjs/toolkit";
import { getIngredients } from "./actions";

const initialState = {
  ingredientsList: [],
  isIngredientsListLoading: false,
  hasIngredientsListRequestError: false
}

export const burgerIngredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  selectors: {
    ingredientsList: state => state.ingredientsList,
    isIngredientsListLoading: state => state.isIngredientsListLoading,
    hasIngredientsListRequestError: state => state.hasIngredientsListRequestError
  },
  extraReducers: builder => {
    builder
      .addCase(getIngredients.pending, (state) =>{
        state.isIngredientsListLoading = true;
        state.hasIngredientsListRequestError = false;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredientsList = action.payload;
        state.isIngredientsListLoading = false;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.hasIngredientsListRequestError = action.error?.message;
        state.isIngredientsListLoading = false;
      })
  }
});

export const {
  ingredientsList,
  isIngredientsListLoading,
  hasIngredientsListRequestError } = burgerIngredientsSlice.selectors;