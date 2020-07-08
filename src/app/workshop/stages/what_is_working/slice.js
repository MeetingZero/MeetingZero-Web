import { createSlice } from '@reduxjs/toolkit';

const whatIsWorkingSlice = createSlice({
  name: 'Workshop/WhatIsWorking',
  initialState: {
    myWhatIsWorkingResponses: []
  },
  reducers: {
    setMyWhatIsWorkingResponses: (state, action) => {
      state.myWhatIsWorkingResponses = action.payload;

      return state;
    }
  }
});

export default whatIsWorkingSlice;