import axiosInstance from '../../app/axios';

import loadingSlice from '../loading/slice';

export const saveNewUser = (user) => {
  return (dispatch) => {
    dispatch(loadingSlice.actions.startLoading('CREATING_NEW_USER'));

    return axiosInstance()
    .post('http://localhost:3000/api/v1/users', { user })
    .then((response) => {
      window
      .localStorage
      .setItem('authToken', response.data.token);

      return dispatch(loadingSlice.actions.stopLoading('CREATING_NEW_USER'));
    })
    .catch((err) => {
      dispatch(loadingSlice.actions.stopLoading('CREATING_NEW_USER'));

      throw err.response.data;
    });
  }
}

export const getUser = () => {
  return (dispatch) => {
    return axiosInstance()
    .get('http://localhost:3000/api/v1/users/me')
    .then((response) => {
      console.log(response);
    });
  }
}