import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    user: null,
    error: null,
  },
  reducers: {
    loginSuccess(state, action) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      AsyncStorage.setItem('token', action.payload.token);
      AsyncStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    registerSuccess(state) {
      state.token = null;
      state.user = null;
      AsyncStorage.removeItem('token');
      AsyncStorage.removeItem('user');
    },
    logout(state) {
      state.token = null;
      state.user = null;
      AsyncStorage.removeItem('token');
      AsyncStorage.removeItem('user');
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

// Action exports
export const { loginSuccess, registerSuccess, logout, setError } = authSlice.actions;

// Selector functions (optional)
export const selectToken = (state) => state.auth.token;
export const selectUser = (state) => state.auth.user;

// Reducer export
export default authSlice.reducer;
