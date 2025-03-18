import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserInfo {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface AuthState {
  userInfo: UserInfo | null;
}

const initialState: AuthState = {
  userInfo: localStorage.getItem("userInfo")
    ? (JSON.parse(localStorage.getItem("userInfo") as string) as UserInfo)
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    clearCredentials: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;

export default authSlice.reducer;
