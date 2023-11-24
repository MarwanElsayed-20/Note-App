import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface UpdateNoteState {
  display: string;
  loading: boolean;
  id: string;
}

interface UpdateNote {
  values: any;
  id: string;
}

const initialState: UpdateNoteState = {
  display: "hidden",
  loading: false,
  id: "",
};

const headers = { token: localStorage.getItem("userToken") };

export const updateNote = createAsyncThunk(
  "UpdateNoteSlice/UpdateNote",
  async ({ values, id }: UpdateNote, thunkApi) => {
    try {
      const data = axios.put(
        `https://note-sigma-black.vercel.app/api/v1/notes/${id}`,
        values,
        { headers }
      );

      return data;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.response.data.msg);
    }
  }
);

export const UpdateNoteSlice = createSlice({
  name: "UpdateNoteSlice",
  initialState,
  reducers: {
    visible: (state) => {
      state.display = "visible";
    },
    hidden: (state) => {
      state.display = "hidden";
    },
    setUpdateId: (state, actions) => {
      state.id = actions.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateNote.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateNote.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updateNote.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { visible, hidden, setUpdateId } = UpdateNoteSlice.actions;
export const UpdateNoteReducer = UpdateNoteSlice.reducer;
