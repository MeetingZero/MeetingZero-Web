import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'User',
  initialState: {
    currentUser: {}
  },
  reducers: {
    setUser: (state, action) => {
      state.currentUser = {
        ...action.payload,
        loggedIn: true
      };

      return state;
    },

    resetUser: (state, action) => {
      state.currentUser = {
        loggedIn: false
      };

      return state;
    }
  }
});

export default userSlice;