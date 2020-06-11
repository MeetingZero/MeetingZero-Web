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
    })
    .catch(() => {
      return dispatch(userSlice.actions.resetUser());
    });
  }
}

export const loginUser = (email, password) => {
  return (dispatch) => {
    dispatch(loadingSlice.actions.startLoading('LOGIN'));

    return axiosInstance()
    .post('/api/v1/users/login', {
      email,
      password
    })
    .then((response) => {
      dispatch(loadingSlice.actions.stopLoading('LOGIN'));

      return window
      .localStorage
      .setItem("authToken", response.data.token);
    })
    .catch((err) => {
      dispatch(loadingSlice.actions.stopLoading('LOGIN'));

      throw err.response.data;
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

export const resetPassword = (password, confirmPassword, email, token) => {
  return (dispatch) => {
    dispatch(loadingSlice.actions.startLoading('RESET_PASSWORD'));

    return axiosInstance()
    .post('/api/v1/users/reset-password', {
      password,
      confirm_password: confirmPassword,
      email,
      token
    })
    .then((response) => {
      dispatch(loadingSlice.actions.stopLoading('RESET_PASSWORD'));

      return response;
    })
    .catch((err) => {
      dispatch(loadingSlice.actions.stopLoading('FORGOT_PASSWORD'));

      throw err.response.data;
    });
  }
}