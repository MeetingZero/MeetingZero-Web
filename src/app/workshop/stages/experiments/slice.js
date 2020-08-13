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
    },
    addBlankExperimentTask: (state, action) => {
      state.experimentTasks = [...state.experimentTasks, null];

      return state;
    }
  }
});

export default experimentsSlice;
