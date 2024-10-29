import { createAsyncThunk } from '@reduxjs/toolkit';

import { getOrderDetails as orderRequest } from '../../utils/api';

export const getOrderDetails = createAsyncThunk(
  'constructor/getOrderDetails',
  async (burgerIngredients: string[]) => {
    return orderRequest(burgerIngredients)
  }
);
