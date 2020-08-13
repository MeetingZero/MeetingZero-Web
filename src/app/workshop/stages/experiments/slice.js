import { createSlice } from '@reduxjs/toolkit';

const experimentsSlice = createSlice({
  name: 'Workshop/Experiments',
  initialState: {
    hypothesis: null,
    experimentTasks: [null]
  },
  reducers: {
    setHypothesis: (state, action) => {
      state.hypothesis = action.payload;

      return state;
    },
    setExperimentTasks: (state, action) => {
      state.experimentTasks = action.payload;

      return state;
    }
  }
});

export default experimentsSlice;
