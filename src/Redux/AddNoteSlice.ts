import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface AddNoteState {
  loading: boolean;
}

const headers = { token: localStorage.getItem("userToken") };

const initialState: AddNoteState = { loading: false };

export const addNote = createAsyncThunk(
  "addNoteSlice/addNote",
  async (values: any, thunkApi) => {
    try {
      const data = await axios.post(
        "https://note-sigma-black.vercel.app/api/v1/notes",
        values,
        { headers }
      );
      return data;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.response.data.msg);
    }
  }
);

export const AddNoteSlice = createSlice({
  name: "addNoteSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addNote.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addNote.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(addNote.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const AddNoteReducer = AddNoteSlice.reducer;
