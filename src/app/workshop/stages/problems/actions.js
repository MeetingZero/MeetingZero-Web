import axiosInstance from '../../../../config/axios';

import loadingSlice from '../../../loading/slice';
import problemsSlice from './slice';

export const getAllResponses = (workshopToken) => {
  return (dispatch) => {
    dispatch(loadingSlice.actions.startLoading('GET_ALL_PROBLEMS_RESPONSES'));

    return axiosInstance()
    .get(`/api/v1/workshops/${workshopToken}/problems`)
    .then((response) => {
      dispatch(loadingSlice.actions.stopLoading('GET_ALL_PROBLEMS_RESPONSES'));

      return dispatch(problemsSlice.actions.setAllProblemsResponses(response.data));
    })
    .catch((err) => {
      dispatch(loadingSlice.actions.stopLoading('GET_ALL_PROBLEMS_RESPONSES'));

      throw err;
    });
  }
}

export const getMyResponses = (workshopToken) => {
  return (dispatch) => {
    dispatch(loadingSlice.actions.startLoading('GET_MY_PROBLEMS_RESPONSES'));

    return axiosInstance()
    .get(`/api/v1/workshops/${workshopToken}/problems?my_filter=true`)
    .then((response) => {
      dispatch(loadingSlice.actions.stopLoading('GET_MY_PROBLEMS_RESPONSES'));

      return dispatch(problemsSlice.actions.setMyProblemsResponses(response.data));
    })
    .catch((err) => {
      dispatch(loadingSlice.actions.stopLoading('GET_MY_PROBLEMS_RESPONSES'));

      throw err;
    });
  }
}

export const saveResponse = (workshopToken, responseText) => {
  return (dispatch) => {
    dispatch(loadingSlice.actions.startLoading('SAVE_PROBLEMS_RESPONSE'));

    return axiosInstance()
    .post(`/api/v1/workshops/${workshopToken}/problems`, { response_text: responseText })
    .then((response) => {
      dispatch(loadingSlice.actions.stopLoading('SAVE_PROBLEMS_RESPONSE'));

      return dispatch(problemsSlice.actions.setMyProblemsResponses(response.data));
    })
    .catch((err) => {
      dispatch(loadingSlice.actions.stopLoading('SAVE_PROBLEMS_RESPONSE'));

      throw err;
    });
  }
}

export const updateResponse = (workshopToken, responseId, responseText) => {
  return (dispatch) => {
    dispatch(loadingSlice.actions.startLoading('SAVE_PROBLEMS_RESPONSE'));

    return axiosInstance()
    .put(`/api/v1/workshops/${workshopToken}/problems/${responseId}`, { response_text: responseText })
    .then((response) => {
      dispatch(loadingSlice.actions.stopLoading('SAVE_PROBLEMS_RESPONSE'));

      return dispatch(problemsSlice.actions.setMyProblemsResponses(response.data));
    })
    .catch((err) => {
      dispatch(loadingSlice.actions.stopLoading('SAVE_PROBLEMS_RESPONSE'));

      throw err;
    });
  }
}
