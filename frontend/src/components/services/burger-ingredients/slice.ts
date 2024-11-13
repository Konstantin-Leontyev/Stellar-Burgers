import { createSlice } from '@reduxjs/toolkit';

import { TIngredient } from "../../utils/types";
import { getIngredients } from './actions';

export type TBurgerIngredientStore = {
  ingredientsList: TIngredient[],
  isIngredientsListLoading: boolean,
  hasIngredientsListRequestError: string | unknown,
  currentTab: 'Булки' | 'Соусы' | 'Начинки'
};

export const initialState: TBurgerIngredientStore = {
  ingredientsList: [],
  isIngredientsListLoading: false,
  hasIngredientsListRequestError: null,
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
          : {
              ...ingredient,
              __v: ingredient.type === 'bun' && action.payload.type === 'bun' ? 0 : ingredient.__v
            }
        )
      ]
    }),
    resetIngredientCount: ((state, action) => {
      state.ingredientsList = [
        ...state.ingredientsList.map(ingredient => ingredient._id === action.payload._id
          ? {
            ...ingredient,
            __v: action.payload.type === 'bun' ? -2 : ingredient.__v -= 1
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

type TActionsCreator = typeof burgerIngredientsSlice.actions;

export type TInternalBurgerIngredientsActions = ReturnType<TActionsCreator[keyof TActionsCreator]>;
