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
      // Limit the what is working responses
      if (action.payload.length < constants.WHAT_IS_WORKING_RESPONSE_LIMIT) {
        state.myWhatIsWorkingResponses = [...action.payload, null];
      } else {
        state.myWhatIsWorkingResponses = action.payload;
      }

      return state;
    },
    setAllWhatIsWorkingResponses: (state, action) => {
      state.allWhatIsWorkingResponses = action.payload;

      return state;
    }
  }
});

export default whatIsWorkingSlice;