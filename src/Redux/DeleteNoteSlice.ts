import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface DeleteNoteState {
  display: string;
  loading: boolean;
}

const initialState: DeleteNoteState = { display: "hidden", loading: false };

const headers = { token: localStorage.getItem("userToken") };

export const deleteNote = createAsyncThunk(
  "DeleteNoteSlice/deleteNote",
  async (id: string, thunkApi) => {
    try {
      const data = axios.delete(
        `https://note-sigma-black.vercel.app/api/v1/notes/${id}`,
        { headers }
      );

      return data;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.response.data.msg);
    }
  }
);

export const DeleteNoteSlice = createSlice({
  name: "DeleteNoteSlice",
  initialState,
  reducers: {
    visible: (state) => {
      state.display = "visible";
    },
    hidden: (state) => {
      state.display = "hidden";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteNote.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteNote.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteNote.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { visible, hidden } = DeleteNoteSlice.actions;
export const DeleteNoteReducer = DeleteNoteSlice.reducer;
