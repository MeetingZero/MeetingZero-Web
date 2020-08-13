import { createSlice } from '@reduxjs/toolkit';

const experimentsSlice = createSlice({
  name: 'Workshop/Experiments',
  initialState: {
    hypothesis: null,
    experimentTasks: []
  },
  reducers: {
    setHypothesis: (state, action) => {
      state.hypothesis = action.payload;

      return state;
    },
    setExperimentTasks: (state, action) => {
      if (action.payload.length > 0) {
        state.experimentTasks = action.payload;
      } else {
        state.experimentTasks = [null];
      }

      return state;
    },
    addBlankExperimentTask: (state, action) => {
      state.experimentTasks = [...state.experimentTasks, null];

      return state;
    }
  }
});

export default experimentsSlice;
