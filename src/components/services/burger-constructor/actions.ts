import { createAsyncThunk } from '@reduxjs/toolkit';

import { TIngredientsId } from "../../utils/types";
import { getOrderInfo as orderRequest } from '../../utils/api';

export const getOrderInfo = createAsyncThunk(
  'constructor/getOrderInfo',
  async (ingredients: TIngredientsId) => {
    return orderRequest(ingredients)
  }
);
