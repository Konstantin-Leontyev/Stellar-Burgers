import { createSlice } from "@reduxjs/toolkit";
import { getOrderDetails } from "./actions";

const initialState = {
  currentBurger: null,
  orderDetails: null,
  isOrderDetailsLoading: false,
  hasOrderDetailsRequestError: false,
  showOrderDetails: false,
}

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  selectors: {
    orderDetails: state => state.orderDetails,
    isOrderDetailsLoading: state => state.isOrderDetailsLoading,
    hasOrderDetailsRequestError: state => state.hasOrderDetailsRequestError,
    showOrderDetails: state => state.showOrderDetails
  },
  reducers: {
    addCurrentBurgerIngredient: ((state, action) => {
      state.currentBurger = action.payload;
    }),
    setOrderDetails: ((state) => {
      state.showOrderDetails = true;
    }),
    resetOrderDetails: ((state) => {
      // state.ingredientDetails = {};
      state.showOrderDetails = false;
    })
  },
  extraReducers: builder => {
    builder
      .addCase(getOrderDetails.pending, (state) =>{
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
})

export const {
  isOrderDetailsLoading,
  hasOrderDetailsRequestError,
  orderDetails,
  showOrderDetails
} = burgerConstructorSlice.selectors;

export const {
  addCurrentBurgerIngredient,
  resetOrderDetails,
  setOrderDetails
} = burgerConstructorSlice.actions;