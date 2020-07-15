import { createSlice } from '@reduxjs/toolkit';

const problemsSlice = createSlice({
  name: 'Workshop/Problems',
  initialState: {
    myProblemsResponses: [null],
    allProblemsResponses: []
  },
  reducers: {
    setMyProblemsResponses: (state, action) => {
      state.myProblemsResponses = [...action.payload, null];

      return state;
    },
    setAllProblemsResponses: (state, action) => {
      state.allProblemsResponses = action.payload;

      return state;
    }
  }
});

export default problemsSlice;
