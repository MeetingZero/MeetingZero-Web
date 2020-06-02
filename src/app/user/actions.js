import axios from 'axios';

import loadingSlice from '../loading/slice';

export const saveNewUser = (user) => {
  return (dispatch) => {
    dispatch(loadingSlice.actions.startLoading("CREATING_NEW_USER"));

    return axios
    .post("http://localhost:3000/api/v1/users", { user })
    .then(() => {
      return dispatch(loadingSlice.actions.stopLoading("CREATING_NEW_USER"));
    })
    .catch((err) => {
      dispatch(loadingSlice.actions.stopLoading("CREATING_NEW_USER"));

      throw err.response.data;
    });
  }
}