import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  token: string;
  name: string;
}

const initialState: UserState = {
  token: JSON.stringify(localStorage.getItem("userToken")),
  name: "",
};

export const UserSlice = createSlice({
  name: "UserSlice",
  initialState,
  reducers: {
    isLogin: (state, actions) => {
      state.token = actions.payload;
    },
    userName: (state, actions) => {
      state.name = actions.payload;
    },
  },
});

export const { isLogin, userName } = UserSlice.actions;
export const UserReducer = UserSlice.reducer;
