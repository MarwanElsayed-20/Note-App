import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface NoteState {
  display: string;
  data: any;
  loading: boolean;
  id: string;
  notesCount: string;
}

const initialState: NoteState = {
  display: "hidden",
  data: [],
  loading: false,
  id: "",
  notesCount: "",
};

const headers = { token: localStorage.getItem("userToken") };

export const getNotes = createAsyncThunk(
  "noteSlice/note",
  async (_, thunkApi) => {
    try {
      const data = await axios.get(
        "https://note-sigma-black.vercel.app/api/v1/notes",
        { headers }
      );
      return data.data;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.response.data.msg);
    }
  }
);

export const NoteSlice = createSlice({
  name: "noteSlice",
  initialState,
  reducers: {
    visible: (state) => {
      state.display = "visible";
    },
    hidden: (state) => {
      state.display = "hidden";
    },
    setId: (state, actions) => {
      state.id = actions.payload;
    },
    setNotesCount: (state, actions) => {
      state.notesCount = actions.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNotes.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getNotes.fulfilled, (state, actions) => {
      state.loading = false;
      state.notesCount = actions.payload.notes.length;
      state.data = actions.payload.notes;
    });
    builder.addCase(getNotes.rejected, (state) => {
      state.loading = false;
      state.data = [];
      state.notesCount = "";
    });
  },
});

export const { visible, hidden, setId, setNotesCount } = NoteSlice.actions;
export const NoteReducer = NoteSlice.reducer;
