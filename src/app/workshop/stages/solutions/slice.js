import { createSlice } from '@reduxjs/toolkit';

import * as constants from 'app/workshop/stages/solutions/constants';

const solutionsSlice = createSlice({
  name: 'Workshop/Solutions',
  initialState: {
    mySolutionsResponses: [null],
    allSolutionsResponses: [],
    solutionsForVoting: []
  },
  reducers: {
    setMySolutionsResponses: (state, action) => {
      // Limit the solutions responses
      if (action.payload.length < constants.SOLUTIONS_RESPONSE_LIMIT) {
        state.mySolutionsResponses = [...action.payload, null];
      } else {
        state.mySolutionsResponses = action.payload;
      }

      return state;
    },
    setAllSolutionsResponses: (state, action) => {
      state.allSolutionsResponses = action.payload;

      return state;
    },
    setSolutionsForVoting: (state, action) => {
      state.solutionsForVoting = action.payload;

      return state;
    }
  }
});

export default solutionsSlice;