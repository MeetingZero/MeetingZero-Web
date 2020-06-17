import axiosInstance from '../../config/axios';

import loadingSlice from '../loading/slice';

export const createWorkshop = (workshop) => {
  return (dispatch) => {
    dispatch(loadingSlice.actions.startLoading('CREATING_NEW_WORKSHOP'));

    return axiosInstance()
    .post('/api/v1/workshops', {
      purpose: workshop.purpose,
      template: "BRANCH_1"
    })
    .then((response) => {
      dispatch(loadingSlice.actions.stopLoading('CREATING_NEW_WORKSHOP'));

      return response.data;
    })
    .catch((err) => {
      dispatch(loadingSlice.actions.stopLoading('CREATING_NEW_WORKSHOP'));

      throw err.response.data;
    });
  }
}