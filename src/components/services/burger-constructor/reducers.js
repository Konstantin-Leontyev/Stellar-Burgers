import { createSlice, nanoid } from "@reduxjs/toolkit";
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
    addCurrentBurgerBun: ((state, action) => {
      state.currentBun = action.payload;
    }),
    addCurrentBurgerIngredient: {
      reducer: ((state, action) => {
        state.currentIngredients = [...state.currentIngredients, action.payload];
      }),
      prepare: (ingredient) => {
        return { payload: {...ingredient, key: nanoid()} }
      }
    },
    deleteCurrentBurgerIngredient: ((state, action) => {
      console.log(action.payload)
      state.currentIngredients = [...state.currentIngredients.filter(ingredient => ingredient.key !== action.payload)];
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
  addCurrentBurgerBun,
  addCurrentBurgerIngredient,
  deleteCurrentBurgerIngredient,
  resetOrderDetails,
} = burgerConstructorSlice.actions;
