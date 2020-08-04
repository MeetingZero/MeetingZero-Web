import { createSlice } from '@reduxjs/toolkit';

const opportunityQuestionSlice = createSlice({
  name: 'Workshop/OpportunityQuestion',
  initialState: {
    myOpportunityQuestionResponse: null
  },
  reducers: {
    setMyOpportunityQuestionResponse: (state, action) => {
      state.myOpportunityQuestionResponse = action.payload;

      return state;
    }
  }
});

export default opportunityQuestionSlice;
