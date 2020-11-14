import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  workshopDirector: null,
  currentWorkshopStep: null,
  workshop: null,
  workshopMembers: [],
  readyWorkshopMembers: [],
  myWorkshops: [],
  workshopSummary: null
}

const workshopSlice = createSlice({
  name: 'Workshop',
  initialState,
  reducers: {
    setWorkshopDirector: (state, action) => {
      state.workshopDirector = action.payload;

      return state;
    },
    setCurrentWorkshopStep: (state, action) => {
      state.currentWorkshopStep = action.payload;

      return state;
    },
    setWorkshop: (state, action) => {
      state.workshop = action.payload;

      return state;
    },
    setWorkshopMembers: (state, action) => {
      state.workshopMembers = action.payload;

      return state;
    },
    setReadyWorkshopMembers: (state, action) => {
      // Show ready members first
      const memberMap = {
        ready: [],
        notReady: []
      }

      action.payload.forEach((rwm) => {
        if (rwm.ready_workshop_member) {
          memberMap.ready = [...memberMap.ready, rwm];
        } else {
          memberMap.notReady = [...memberMap.notReady, rwm];
        }
      });

      state.readyWorkshopMembers = [...memberMap.ready, ...memberMap.notReady];

      return state;
    },
    setMyWorkshops: (state, action) => {
      state.myWorkshops = action.payload.map((ap) => {
        return ap.workshop;
      });

      return state;
    },
    setWorkshopSummary: (state, action) => {
      state.workshopSummary = action.payload;

      return state;
    },
    reset: (state) => {
      state = initialState;

      return state;
    }
  }
});

export default workshopSlice;
