import { configureStore } from '@reduxjs/toolkit';

import loadingSlice from './loading/slice';
import userSlice from './user/slice';
import workshopSlice from './workshop/slice';

export default configureStore({
  reducer: {
    Loading: loadingSlice.reducer,
    User: userSlice.reducer,
    Workshop: workshopSlice.reducer
  }
});
