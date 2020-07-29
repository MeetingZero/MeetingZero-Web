import { configureStore } from '@reduxjs/toolkit';

import loadingSlice from './loading/slice';
import userSlice from './user/slice';
import workshopSlice from './workshop/slice';
import whatIsWorkingSlice from './workshop/stages/what_is_working/slice';
import problemsSlice from './workshop/stages/problems/slice';
import votingSlice from './voting/slice';

export default configureStore({
  reducer: {
    Loading: loadingSlice.reducer,
    User: userSlice.reducer,
    Workshop: workshopSlice.reducer,
    WhatIsWorking: whatIsWorkingSlice.reducer,
    Problems: problemsSlice.reducer,
    Voting: votingSlice.reducer
  }
});
