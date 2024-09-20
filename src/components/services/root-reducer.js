import { combineSlices } from "@reduxjs/toolkit";
import { burgerConstructorSlice } from "./burger-constructor/reducers";
import { burgerIngredientsSlice } from "./burger-ingredients/reducers";

export const rootReducer = combineSlices(
  burgerConstructorSlice,
  burgerIngredientsSlice,
);
