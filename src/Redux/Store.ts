import { configureStore } from "@reduxjs/toolkit";
import { NoteReducer } from "./NoteSlice";
import { UpdateNoteReducer } from "./UpdateNoteSlice";
import { DeleteNoteReducer } from "./DeleteNoteSlice";
import { RegisterReducer } from "./RegisterSlice";
import { LoginReducer } from "./LoginSlice";
import { UserReducer } from "./UserSlice";
import { AddNoteReducer } from "./AddNoteSlice";

const store = configureStore({
  reducer: {
    note: NoteReducer,
    UpdateNote: UpdateNoteReducer,
    DeleteNote: DeleteNoteReducer,
    AddNote: AddNoteReducer,
    Register: RegisterReducer,
    Login: LoginReducer,
    User: UserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
