import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getUser,
  loginUser, logoutUser,
  registerUser, updateUser,
} from "../../utils/api";

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