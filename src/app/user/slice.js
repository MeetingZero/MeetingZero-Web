import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'User',
  initialState: {
    currentUser: {}
  },
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;

      return state;
    }
  }
});

export default userSlice;