import { createSlice } from '@reduxjs/toolkit';
import { getUserProfile, login, logout, register, setUser, updateUserProfile } from './actions'

const initialState = {
  user: null,
  isAuthChecked: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  selectors: {
    getUser: state => state.user,
    getIsAuthChecked: state => state.isAuthChecked,
  },
  reducers: {
    setIsAuthChecked: (state, action) => {
      state.isAuthChecked = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user = null;
      })
      .addCase(setUser, (state, action) => {
        state.user = action.payload;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
  },
});

export const { setIsAuthChecked } = authSlice.actions;

export const { getIsAuthChecked, getUser } = authSlice.selectors;
