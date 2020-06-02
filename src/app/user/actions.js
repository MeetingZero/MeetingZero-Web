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

export const getUser = () => {
  return (dispatch) => {
    return axios
    .get("http://localhost:3000/api/v1/users/me", {
      headers: {
        "Authorization": window.localStorage.getItem("token")
      }
    })
    .then((response) => {
      console.log(response);
    });
  }
}