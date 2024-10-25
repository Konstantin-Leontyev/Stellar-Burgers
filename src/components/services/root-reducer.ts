import { combineSlices } from "@reduxjs/toolkit";

import { authSlice } from "./auth/slice";
import { burgerConstructorSlice } from "./burger-constructor/slice";
import { burgerIngredientsSlice } from "./burger-ingredients/slice";
import { feedSlice } from "./feed/slice";

export const rootReducer = combineSlices(
  authSlice,
  burgerConstructorSlice,
  burgerIngredientsSlice,
  feedSlice,
);
