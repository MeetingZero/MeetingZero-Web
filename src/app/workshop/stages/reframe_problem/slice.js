import { createSlice } from '@reduxjs/toolkit';

const reframeProblemSlice = createSlice({
  name: 'Workshop/ReframeProblem',
  initialState: {
    myReframeProblemResponse: null,
    allReframeProblemResponses: []
  },
  reducers: {
    setMyReframeProblemResponse: (state, action) => {
      state.myReframeProblemResponse = action.payload;

      return state;
    },
    setAllReframeProblemResponses: (state, action) => {
      state.allReframeProblemResponses = action.payload;

      return state;
    }
  }
});

export default reframeProblemSlice;