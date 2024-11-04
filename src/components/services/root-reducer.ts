import { combineSlices } from '@reduxjs/toolkit';

import { authSlice } from './auth/slice';
import { burgerConstructorSlice } from './burger-constructor/slice';
import { burgerIngredientsSlice } from './burger-ingredients/slice';
import { orderSlice } from './order-details/slice';
import { websocketSlice } from './websocket/slice';

export const rootReducer = combineSlices(
  authSlice,
  orderSlice,
  burgerConstructorSlice,
  burgerIngredientsSlice,
  websocketSlice,
);
