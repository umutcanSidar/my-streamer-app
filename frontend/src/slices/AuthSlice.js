import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URI = process.env.URL || "http://localhost:4000";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await axios.post(`${URI}/v1/api/auth/signin`, {
        email: email,
        password: password,
      });
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.errMsg);
    }
  }
);

export const verifyToken = createAsyncThunk(
  "auth/verify",
  async (_, thunkAPI) => {
    const token = localStorage.getItem("token");

    if (!token) {
      return thunkAPI.rejectWithValue("Token bulunamadı..");
    }

    try {
      const response = await axios.post(
        `${URI}/v1/api/auth/verify-token`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      localStorage.removeItem("token");
      return thunkAPI.rejectWithValue(error.response.data.errMsg);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    error: false,
    loading: false,
    user: null,
  },
  reducers: {
    logout: () => {
      console.log("ok");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = false;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.isAuth = true;
      state.user = action.payload;
    });

    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.isAuth = false;
      state.errMsg = action.payload;
    });

    builder.addCase(verifyToken.pending, (state) => {
      state.loading = true;
      state.error = false;
      state.isAuth = false;
    });

    builder.addCase(verifyToken.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.user = action.payload;
      state.isAuth = true;
    });

    builder.addCase(verifyToken.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.isAuth = false;
      state.errMsg = action.payload;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
