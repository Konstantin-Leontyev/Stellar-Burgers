import { createSlice } from "@reduxjs/toolkit";
import { getIngredients } from "./actions";

const initialState = {
  ingredientsList: [],
  isIngredientsListLoading: false,
  hasIngredientsListRequestError: false,

  currentTab: 'Булки',
}

export const burgerIngredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  selectors: {
    currentTab: state => state.currentTab,
    ingredientsList: state => state.ingredientsList,
    isIngredientsListLoading: state => state.isIngredientsListLoading,
    hasIngredientsListRequestError: state => state.hasIngredientsListRequestError
  },
  reducers: {
    setTab: ((state, action) => {
      state.currentTab = action.payload;
    }),
    setIngredientCount: ((state, action) => {
      state.ingredientsList = [
        ...state.ingredientsList.map(ingredient => ingredient._id === action.payload._id
          ? {
            ...ingredient,
            __v: action.payload.type === 'bun' ? 2 : ingredient.__v += 1
          }
          : ingredient.type === 'bun'
            ? {
              ...ingredient,
              __v: 0
            }
            : ingredient
        )
      ]
    }),
    resetIngredientCount: ((state, action) => {
      state.ingredientsList = [
        ...state.ingredientsList.map(ingredient => ingredient._id === action.payload._id
          ? {
            ...ingredient,
            __v: ingredient.__v -= 1
          }
          : ingredient
        )
      ]
    })
  },
  extraReducers: builder => {
    builder
      .addCase(getIngredients.pending, (state) =>{
        state.isIngredientsListLoading = true;
        state.hasIngredientsListRequestError = false;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredientsList = action.payload;
        state.isIngredientsListLoading = false;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.hasIngredientsListRequestError = action.error?.message;
        state.isIngredientsListLoading = false;
      })
  }
});

export const {
  currentTab,
  ingredientsList,
  isIngredientsListLoading,
  hasIngredientsListRequestError } = burgerIngredientsSlice.selectors;

export const {
  resetIngredientCount,
  setIngredientCount,
  setTab
} = burgerIngredientsSlice.actions;
