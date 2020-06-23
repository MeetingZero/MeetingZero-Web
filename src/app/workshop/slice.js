import { createSlice } from '@reduxjs/toolkit';

const workshopSlice = createSlice({
  name: 'Workshop',
  initialState: {
    workshopDirector: [],
    currentWorkshopStep: null
  },
  reducers: {
    setWorkshopDirector: (state, action) => {
      state.workshopDirector = action.payload;

      return state;
    },
    setCurrentWorkshopStep: (state, action) => {
      state.currentWorkshopStep = action.payload;

      return state;
    }
  }
});

export default workshopSlice;