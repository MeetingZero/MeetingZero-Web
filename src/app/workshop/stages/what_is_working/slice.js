import { createSlice } from '@reduxjs/toolkit';

import * as constants from 'app/workshop/stages/what_is_working/constants';

const whatIsWorkingSlice = createSlice({
  name: 'Workshop/WhatIsWorking',
  initialState: {
    myWhatIsWorkingResponses: [null],
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