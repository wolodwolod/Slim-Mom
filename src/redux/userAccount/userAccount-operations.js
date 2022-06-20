import { createAsyncThunk } from "@reduxjs/toolkit";

import auth from "../../shared/api/auth";

const registerUser = createAsyncThunk(
  "/auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const result = await auth.registerUser(userData);
      return result;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const loginUser = createAsyncThunk(
  "/auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const result = await auth.loginUser(userData);
      return result;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const logoutUser = createAsyncThunk(
  "/auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const result = await auth.logoutUser();
      return result;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const getCurrentUser = createAsyncThunk(
  "/auth/user",
  async (userData, { rejectWithValue }) => {
    try {
      const result = await auth.getCurrentUser(userData);
      
      return result;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  },
  {
    condition: (userData) => {
      if (!userData) {
        return false;
      }
    },
  }
);

const resendVerification = createAsyncThunk(
  "/auth/verify",
  async (userData, { rejectWithValue }) => {
    try {
      const result = await auth.resendVerification({email:userData});
      return result;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const userOperations = {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  resendVerification
};
