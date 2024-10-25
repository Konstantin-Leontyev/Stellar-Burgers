import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import {
  getUser,
  loginUser, logoutUser,
  registerUser, updateUser,
} from '../../utils/api';
import { setIsAuthChecked } from './slice';

export const register = createAsyncThunk(
  'auth/register',
  async (formData) => {
    return registerUser(formData);
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (formData) => {
    return loginUser(formData);
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    return logoutUser();
  }
);

export const getUserProfile = createAsyncThunk(
  'auth/user',
  async () => {
    return getUser();
  }
);

export const updateUserProfile = createAsyncThunk(
  'auth/patch',
  async (formData) => {
    return updateUser(formData);
  }
);

export const setUser = createAction('auth/setUser');

export const checkUserAuth = createAsyncThunk(
  'auth/checkUserAuth',
  async (_, { dispatch }) => {
    if (localStorage.getItem('accessToken')) {
      return getUser()
        .then((user) => dispatch(setUser(user)))
        .finally(dispatch(setIsAuthChecked(true)));
    } else {
      dispatch(setIsAuthChecked(true))
    }
  }
);
