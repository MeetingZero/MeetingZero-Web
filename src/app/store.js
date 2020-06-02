import { configureStore } from '@reduxjs/toolkit';

import loadingSlice from './loading/slice';

export default configureStore({
  reducer: {
    Loading: loadingSlice.reducer
  }
});
