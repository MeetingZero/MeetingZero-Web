import { createSlice } from '@reduxjs/toolkit';

const experimentSlice = createSlice({
  name: 'Workshop/Experiment',
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

export default experimentSlice;
