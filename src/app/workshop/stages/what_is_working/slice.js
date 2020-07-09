import { createSlice } from '@reduxjs/toolkit';

const whatIsWorkingSlice = createSlice({
  name: 'Workshop/WhatIsWorking',
  initialState: {
    myWhatIsWorkingResponses: [],
    allWhatIsWorkingResponses: []
  },
  reducers: {
    setMyWhatIsWorkingResponses: (state, action) => {
      state.myWhatIsWorkingResponses = action.payload;

      return state;
    },
    setAllWhatIsWorkingResponses: (state, action) => {
      state.allWhatIsWorkingResponses = action.payload;

      return state;
    }
  }
});

export default whatIsWorkingSlice;