import { createSlice } from '@reduxjs/toolkit';

const votingSlice = createSlice({
  name: 'Voting',
  initialState: {
    starVotingResults: {}
  },
  reducers: {
    setStarVotingResults: (state, action) => {
      state.starVotingResults = {
        ...state.starVotingResults,
        ...action.payload
      };

      return state;
    }
  }
});

export default votingSlice;
