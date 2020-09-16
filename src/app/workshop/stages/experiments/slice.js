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
    },
    removeBlankExperimentTask: (state, action) => {
      const lastItem = state.experimentTasks[state.experimentTasks.length - 1];

      if (lastItem === null) {
        state.experimentTasks.pop();
      }
    }
  }
});

export default experimentsSlice;
