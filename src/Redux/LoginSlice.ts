import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface LoginState {
  loading: boolean;
}

const initialState: LoginState = { loading: false };

export const login = createAsyncThunk(
  "loginSlice/login",
  async (values: any, thunkApi) => {
    try {
      const data = await axios.post(
        "https://note-sigma-black.vercel.app/api/v1/users/signIn",
        values
      );

      return data;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.response.data.msg);
    }
  }
);

export const LoginSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(login.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const LoginReducer = LoginSlice.reducer;
