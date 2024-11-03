import { createSlice } from '@reduxjs/toolkit';

import { TOrder } from "../../utils/types";
import { getOrderDetails } from './actions';

type TOrderStore = {
  orderDetails: TOrder | null,
  isOrderDetailsLoading: boolean,
  hasOrderDetailsRequestError: string | unknown,
};

const initialState: TOrderStore = {
  orderDetails: null,
  isOrderDetailsLoading: false,
  hasOrderDetailsRequestError: null,
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  selectors: {
    orderDetails: state => state.orderDetails,
    isOrderDetailsLoading: state => state.isOrderDetailsLoading,
    hasOrderDetailsRequestError: state => state.hasOrderDetailsRequestError,
  },
  extraReducers: builder => {
    builder
      .addCase(getOrderDetails.pending, (state) => {
        state.isOrderDetailsLoading = true;
        state.hasOrderDetailsRequestError = false;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.orderDetails = action.payload;
        state.isOrderDetailsLoading = false;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.hasOrderDetailsRequestError = action.error?.message;
        state.isOrderDetailsLoading = false;
      })
  }
});

export const {
  isOrderDetailsLoading,
  hasOrderDetailsRequestError,
  orderDetails,
} = orderSlice.selectors;
