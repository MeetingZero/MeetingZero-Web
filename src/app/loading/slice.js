import { createSlice } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
  name: 'Loading',
  initialState: [],
  reducers: {
    startLoading: (state, action) => {
      return state.concat(action.payload);
    },
    stopLoading: (state, action) => {
      return state.filter(i => i !== action.payload);
    }
  }
});

export default loadingSlice;