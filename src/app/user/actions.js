import axios from 'axios';

export const saveNewUser = (user) => {
  return (dispatch) => {
    return axios
    .post("http://localhost:3000/api/v1/users", { user })
    .then((response) => {
      return dispatch({
        type: "CREATE_NEW_USER_SUCCESS",
        payload: response.data
      });
    });
  }
}