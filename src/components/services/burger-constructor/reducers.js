import { createSlice } from "@reduxjs/toolkit";
import { getOrderDetails } from "./actions";

const initialState = {
  currentBun: null,
  currentIngredients: [],
  orderDetails: null,
  isOrderDetailsLoading: false,
  hasOrderDetailsRequestError: false,
  showOrderDetails: false,
}

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  selectors: {
    currentBun: state => state.currentBun,
    currentIngredients: state => state.currentIngredients,
    orderDetails: state => state.orderDetails,
    isOrderDetailsLoading: state => state.isOrderDetailsLoading,
    hasOrderDetailsRequestError: state => state.hasOrderDetailsRequestError,
    showOrderDetails: state => state.showOrderDetails
  },
  reducers: {
    addCurrentBurgerIngredient: ((state, action) => {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        state.ingredients = state.ingredients.push(action.payload)
      }
    }),
    resetOrderDetails: ((state) => {
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
        state.showOrderDetails = true;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.hasOrderDetailsRequestError = action.error?.message;
        state.isOrderDetailsLoading = false;
      })
  }
})

export const {
  currentBun,
  currentIngredients,
  isOrderDetailsLoading,
  hasOrderDetailsRequestError,
  orderDetails,
  showOrderDetails
} = burgerConstructorSlice.selectors;

export const {
  addCurrentBurgerIngredient,
  resetOrderDetails,
} = burgerConstructorSlice.actions;
