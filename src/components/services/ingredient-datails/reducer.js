import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ingredientDetails: {},
  showIngredientDetails: false
};

export const ingredientDetailsSlice = createSlice({
  name: 'ingredientDetails',
  initialState,
  selectors: {
    ingredientDetails: state => state.ingredientDetails,
    showIngredientDetails: state => state.showIngredientDetails
  },
  reducers: {
    setIngredientDetails: ((state, action) => {
      state.ingredientDetails = action.payload;
      state.showIngredientDetails = true;
    }),
    resetIngredientDetails: ((state) => {
      state.ingredientDetails = {};
      state.showIngredientDetails = false;
    })
  }
});

export const { ingredientDetails, showIngredientDetails } = ingredientDetailsSlice.selectors;
export const { setIngredientDetails, resetIngredientDetails } = ingredientDetailsSlice.actions;

