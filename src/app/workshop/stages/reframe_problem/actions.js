import axiosInstance from '../../../../config/axios';

import loadingSlice from '../../../loading/slice';
import reframeProblemSlice from './slice';

export const saveResponse = (workshopToken, responseText) => {
  return (dispatch) => {
    dispatch(loadingSlice.actions.startLoading('SAVE_REFRAME_PROBLEM_RESPONSE'));

    return axiosInstance()
    .post(`/api/v1/workshops/${workshopToken}/reframe_problem`, { response_text: responseText })
    .then((response) => {
      dispatch(loadingSlice.actions.stopLoading('SAVE_REFRAME_PROBLEM_RESPONSE'));

      return dispatch(reframeProblemSlice.actions.setMyReframeProblemResponse(response.data));
    })
    .catch((err) => {
      dispatch(loadingSlice.actions.stopLoading('SAVE_REFRAME_PROBLEM_RESPONSE'));

      throw err;
    });
  }
}

export const updateResponse = (workshopToken, responseId, responseText) => {
  return (dispatch) => {
    dispatch(loadingSlice.actions.startLoading('SAVE_REFRAME_PROBLEM_RESPONSE'));

    return axiosInstance()
    .put(`/api/v1/workshops/${workshopToken}/reframe_problem/${responseId}`, { response_text: responseText })
    .then((response) => {
      dispatch(loadingSlice.actions.stopLoading('SAVE_REFRAME_PROBLEM_RESPONSE'));

      return dispatch(reframeProblemSlice.actions.setMyReframeProblemResponse(response.data));
    })
    .catch((err) => {
      dispatch(loadingSlice.actions.stopLoading('SAVE_REFRAME_PROBLEM_RESPONSE'));

      throw err;
    });
  }
}

export const getMyResponse = (workshopToken) => {
  return (dispatch) => {
    dispatch(loadingSlice.actions.startLoading('GET_MY_REFRAME_PROBLEM_RESPONSE'));

    return axiosInstance()
    .get(`/api/v1/workshops/${workshopToken}/reframe_problem?my_filter=true`)
    .then((response) => {
      dispatch(loadingSlice.actions.stopLoading('GET_MY_REFRAME_PROBLEM_RESPONSE'));

      return dispatch(reframeProblemSlice.actions.setMyReframeProblemResponse(response.data));
    })
    .catch((err) => {
      dispatch(loadingSlice.actions.stopLoading('GET_MY_REFRAME_PROBLEM_RESPONSE'));

      throw err;
    });
  }
}

export const getAllResponses = (workshopToken) => {
  return (dispatch) => {
    dispatch(loadingSlice.actions.startLoading('GET_ALL_REFRAME_PROBLEM_RESPONSES'));

    return axiosInstance()
    .get(`/api/v1/workshops/${workshopToken}/reframe_problem`)
    .then((response) => {
      dispatch(loadingSlice.actions.stopLoading('GET_ALL_REFRAME_PROBLEM_RESPONSES'));

      return dispatch(reframeProblemSlice.actions.setAllReframeProblemResponses(response.data));
    })
    .catch((err) => {
      dispatch(loadingSlice.actions.stopLoading('GET_ALL_REFRAME_PROBLEM_RESPONSES'));

      throw err;
    });
  }
}