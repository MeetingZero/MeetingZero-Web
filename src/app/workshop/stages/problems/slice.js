import { createSlice } from '@reduxjs/toolkit';

import * as constants from 'app/workshop/stages/problems/constants';

const problemsSlice = createSlice({
  name: 'Workshop/Problems',
  initialState: {
    myProblemsResponses: [null],
    allProblemsResponses: []
  },
  reducers: {
    setMyProblemsResponses: (state, action) => {
      // Limit the problem responses
      if (action.payload.length < constants.PROBLEMS_RESPONSE_LIMIT) {
        state.myProblemsResponses = [...action.payload, null];
      } else {
        state.myProblemsResponses = action.payload;
      }

      return state;
    },
    setAllProblemsResponses: (state, action) => {
      state.allProblemsResponses = action.payload;

      return state;
    }
  }
});

export default problemsSlice;
