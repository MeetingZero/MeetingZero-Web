import { createSlice } from '@reduxjs/toolkit';

const experimentsSlice = createSlice({
  name: 'Workshop/Experiments',
  initialState: {
    hypothesis: null
  },
  reducers: {
    setHypothesis: (state, action) => {
      state.hypothesis = action.payload;

      return state;
    }
  }
});

export default experimentsSlice;
