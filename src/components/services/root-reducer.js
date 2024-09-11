import { combineSlices } from "@reduxjs/toolkit";
import { ingredientsSlice } from "./burger-ingredients/reducers";
import {ingredientDetailsSlice} from "./ingredient-datails/reducer";

export const rootReducer = combineSlices(
  ingredientsSlice,
  ingredientDetailsSlice
);
