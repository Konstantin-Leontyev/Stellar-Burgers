import { combineSlices } from "@reduxjs/toolkit";
import { ingredientsSlice } from "./burger-ingredients/reducers";

export const rootReducer = combineSlices(ingredientsSlice);
