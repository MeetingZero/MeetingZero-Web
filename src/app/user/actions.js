import axiosInstance from '../../config/axios';

import loadingSlice from '../loading/slice';
import userSlice from './slice';

export const saveNewUser = (user) => {
  return (dispatch) => {
    dispatch(loadingSlice.actions.startLoading('CREATING_NEW_USER'));

    return axiosInstance()
    .post('/api/v1/users', { user })
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
    .get('/api/v1/users/me')
    .then((response) => {
      return dispatch(userSlice.actions.setUser(response.data));
    });
  }
}

export const loginUser = (email, password) => {
  return (dispatch) => {
    return axiosInstance()
    .post('/api/v1/users/login', {
      email,
      password
    })
    .then((response) => {
      return window
      .localStorage
      .setItem("authToken", response.data.token);
    });
  }
}

export const forgotPassword = (email) => {
  return (dispatch) => {
    dispatch(loadingSlice.actions.startLoading('FORGOT_PASSWORD'));

    return axiosInstance()
    .post('/api/v1/users/forgot-password', { email })
    .then((response) => {
      dispatch(loadingSlice.actions.stopLoading('FORGOT_PASSWORD'));
      
      return response;
    })
    .catch((err) => {
      dispatch(loadingSlice.actions.stopLoading('FORGOT_PASSWORD'));

      throw err.response.data;
    });
  }
}