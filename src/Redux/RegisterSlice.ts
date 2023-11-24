import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface RegisterState {
  loading: boolean;
  errorMsg: boolean;
  successMsg: boolean;
}

export const register = createAsyncThunk(
  "registerSlice/register",
  async (values: any, thunkApi) => {
    try {
      const data = await axios.post(
        "https://note-sigma-black.vercel.app/api/v1/users/signUp",
        values
      );
      return data;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.response.data.msg);
    }
  }
);

const initialState: RegisterState = {
  loading: false,
  errorMsg: false,
  successMsg: false,
};

export const registerSlice = createSlice({
  name: "registerSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.loading = true;
      state.successMsg = false;
      state.errorMsg = false;
    });
    builder.addCase(register.fulfilled, (state) => {
      state.loading = false;
      state.successMsg = true;
      state.errorMsg = false;
    });
    builder.addCase(register.rejected, (state) => {
      state.loading = false;
      state.successMsg = false;
      state.errorMsg = true;
    });
  },
});

export const RegisterReducer = registerSlice.reducer;
