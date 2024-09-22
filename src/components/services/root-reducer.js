import { combineSlices } from "@reduxjs/toolkit";

import { authSlice } from "./auth/reducers";
import { burgerConstructorSlice } from "./burger-constructor/reducers";
import { burgerIngredientsSlice } from "./burger-ingredients/reducers";

export const rootReducer = combineSlices(
  authSlice,
  burgerConstructorSlice,
  burgerIngredientsSlice,
);
