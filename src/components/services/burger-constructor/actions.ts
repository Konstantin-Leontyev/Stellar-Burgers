import { createAsyncThunk } from '@reduxjs/toolkit';

import { getOrderInfo as orderRequest } from '../../utils/api';

export const getOrderInfo = createAsyncThunk(
  'constructor/getOrderInfo',
  async (burgerIngredients: string[]) => {
    return orderRequest(burgerIngredients)
  }
);
