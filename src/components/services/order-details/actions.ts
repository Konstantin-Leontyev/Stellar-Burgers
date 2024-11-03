import { createAsyncThunk } from '@reduxjs/toolkit';

import { getOrderDetails as orderRequest } from '../../utils/api';

export const getOrderDetails = createAsyncThunk(
  'order/getOrderDetails',
  async (number: number) => {
    return orderRequest(number)
  }
);
