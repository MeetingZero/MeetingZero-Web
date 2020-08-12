import { configureStore } from '@reduxjs/toolkit';

import votingSlice from './voting/slice';
import loadingSlice from './loading/slice';
import userSlice from './user/slice';
import workshopSlice from './workshop/slice';
import whatIsWorkingSlice from './workshop/stages/what_is_working/slice';
import problemsSlice from './workshop/stages/problems/slice';
import reframeProblemSlice from './workshop/stages/reframe_problem/slice';
import opportunityQuestionSlice from './workshop/stages/opportunity_question/slice';
import solutionsSlice from './workshop/stages/solutions/slice';
import experimentSlice from './workshop/stages/experiments/slice';

export default configureStore({
  reducer: {
    Voting: votingSlice.reducer,
    Loading: loadingSlice.reducer,
    User: userSlice.reducer,
    Workshop: workshopSlice.reducer,
    WhatIsWorking: whatIsWorkingSlice.reducer,
    Problems: problemsSlice.reducer,
    ReframeProblem: reframeProblemSlice.reducer,
    OpportunityQuestion: opportunityQuestionSlice.reducer,
    Solutions: solutionsSlice.reducer,
    Experiment: experimentSlice.reducer
  }
});
