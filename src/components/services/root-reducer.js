import { combineSlices } from "@reduxjs/toolkit";
import { burgerConstructorSlice } from "./burger-constructor/reducers";
import { burgerIngredientsSlice } from "./burger-ingredients/reducers";
import { ingredientDetailsSlice } from "./ingredient-datails/reducer";

export const rootReducer = combineSlices(
  burgerConstructorSlice,
  burgerIngredientsSlice,
  ingredientDetailsSlice,
);
