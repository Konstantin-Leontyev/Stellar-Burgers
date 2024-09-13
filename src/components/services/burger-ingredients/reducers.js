import { createSlice } from "@reduxjs/toolkit";
import { getIngredients } from "./actions";

const initialState = {
  ingredientsList: [],
  isIngredientsListLoading: false,
  hasIngredientsListRequestError: false,

  currentTab: 'Булки'
}

export const burgerIngredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  selectors: {
    currentTab: state => state.currentTab,
    ingredientsList: state => state.ingredientsList,
    isIngredientsListLoading: state => state.isIngredientsListLoading,
    hasIngredientsListRequestError: state => state.hasIngredientsListRequestError
  },
  reducers: {
    setTab: ((state, action) => {
      state.currentTab = action.payload;
    })
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
  currentTab,
  ingredientsList,
  isIngredientsListLoading,
  hasIngredientsListRequestError } = burgerIngredientsSlice.selectors;

export const { setTab } = burgerIngredientsSlice.actions;