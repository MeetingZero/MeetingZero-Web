import { createSlice } from '@reduxjs/toolkit';

const problemsSlice = createSlice({
  name: 'Workshop/Problems',
  initialState: {
    myProblemsResponses: [null],
    allProblemsResponses: [],
    problemsVoteResults: null
  },
  reducers: {
    setMyProblemsResponses: (state, action) => {
      state.myProblemsResponses = [...action.payload, null];

      return state;
    },
    setAllProblemsResponses: (state, action) => {
      state.allProblemsResponses = action.payload;

      return state;
    },
    setProblemsVoteResults: (state, action) => {
      state.problemsVoteResults = action.payload;

      return state;
    }
  }
});

export default problemsSlice;
