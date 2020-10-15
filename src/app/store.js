import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';

import votingSlice from './voting/slice';
import loadingSlice from './loading/slice';
import userSlice from './user/slice';
import workshopSlice from './workshop/slice';
import whatIsWorkingSlice from './workshop/stages/what_is_working/slice';
import problemsSlice from './workshop/stages/problems/slice';
import reframeProblemSlice from './workshop/stages/reframe_problem/slice';
import opportunityQuestionSlice from './workshop/stages/opportunity_question/slice';
import solutionsSlice from './workshop/stages/solutions/slice';
import experimentsSlice from './workshop/stages/experiments/slice';

const combinedReducer = combineReducers({
  Voting: votingSlice.reducer,
  Loading: loadingSlice.reducer,
  User: userSlice.reducer,
  Workshop: workshopSlice.reducer,
  WhatIsWorking: whatIsWorkingSlice.reducer,
  Problems: problemsSlice.reducer,
  ReframeProblem: reframeProblemSlice.reducer,
  OpportunityQuestion: opportunityQuestionSlice.reducer,
  Solutions: solutionsSlice.reducer,
  Experiments: experimentsSlice.reducer
});

const rootReducer = (state, action) => {
  if (action.type === "User/resetAll") {
    state = undefined;
  }

  return combinedReducer(state, action);
}

export default configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware()]
});
