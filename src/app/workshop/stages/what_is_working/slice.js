import { createSlice } from '@reduxjs/toolkit';

const whatIsWorkingSlice = createSlice({
  name: 'Workshop/WhatIsWorking',
  initialState: {
    whatIsWorkingResponses: []
  },
  reducers: {
    setWhatIsWorkingResponses: (state, action) => {
      state.whatIsWorkingResponses = action.payload;

      return state;
    }
  }
});

export default whatIsWorkingSlice;