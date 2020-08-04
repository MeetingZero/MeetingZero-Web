import { createSlice } from '@reduxjs/toolkit';

const opportunityQuestionSlice = createSlice({
  name: 'Workshop/OpportunityQuestion',
  initialState: {
    opportunityQuestionResponse: null
  },
  reducers: {
    setMyOpportunityQuestionResponse: (state, action) => {
      state.opportunityQuestionResponse = action.payload;

      return state;
    }
  }
});

export default opportunityQuestionSlice;
