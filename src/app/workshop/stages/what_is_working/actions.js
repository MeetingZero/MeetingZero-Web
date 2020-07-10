import axiosInstance from '../../../../config/axios';

import loadingSlice from '../../../loading/slice';
import whatIsWorkingSlice from './slice';

export const saveResponse = (workshopToken, responseText) => {
  return (dispatch) => {
    dispatch(loadingSlice.actions.startLoading('SAVE_WHAT_IS_WORKING_RESPONSE'));

    return axiosInstance()
    .post(`/api/v1/workshops/${workshopToken}/what_is_working`, { response_text: responseText })
    .then((response) => {
      dispatch(loadingSlice.actions.stopLoading('SAVE_WHAT_IS_WORKING_RESPONSE'));

      return dispatch(whatIsWorkingSlice.actions.setMyWhatIsWorkingResponses(response.data));
    })
    .catch((err) => {
      dispatch(loadingSlice.actions.stopLoading('SAVE_WHAT_IS_WORKING_RESPONSE'));

      throw err;
    });
  }
}

export const updateResponse = (workshopToken, responseId, responseText) => {
  return (dispatch) => {
    dispatch(loadingSlice.actions.startLoading('SAVE_WHAT_IS_WORKING_RESPONSE'));

    return axiosInstance()
    .put(`/api/v1/workshops/${workshopToken}/what_is_working/${responseId}`, { response_text: responseText })
    .then((response) => {
      dispatch(loadingSlice.actions.stopLoading('SAVE_WHAT_IS_WORKING_RESPONSE'));

      return dispatch(whatIsWorkingSlice.actions.setMyWhatIsWorkingResponses(response.data));
    })
    .catch((err) => {
      dispatch(loadingSlice.actions.stopLoading('SAVE_WHAT_IS_WORKING_RESPONSE'));

      throw err;
    });
  }
}

export const getMyResponses = (workshopToken) => {
  return (dispatch) => {
    dispatch(loadingSlice.actions.startLoading('GET_MY_WHAT_IS_WORKING_RESPONSES'));

    return axiosInstance()
    .get(`/api/v1/workshops/${workshopToken}/what_is_working?my_filter=true`)
    .then((response) => {
      dispatch(loadingSlice.actions.stopLoading('GET_MY_WHAT_IS_WORKING_RESPONSES'));

      return dispatch(whatIsWorkingSlice.actions.setMyWhatIsWorkingResponses(response.data));
    })
    .catch((err) => {
      dispatch(loadingSlice.actions.stopLoading('GET_MY_WHAT_IS_WORKING_RESPONSES'));

      throw err;
    });
  }
}

export const getAllResponses = (workshopToken) => {
  return (dispatch) => {
    dispatch(loadingSlice.actions.startLoading('GET_ALL_WHAT_IS_WORKING_RESPONSES'));

    return axiosInstance()
    .get(`/api/v1/workshops/${workshopToken}/what_is_working`)
    .then((response) => {
      dispatch(loadingSlice.actions.stopLoading('GET_ALL_WHAT_IS_WORKING_RESPONSES'));

      return dispatch(whatIsWorkingSlice.actions.setAllWhatIsWorkingResponses(response.data));
    })
    .catch((err) => {
      dispatch(loadingSlice.actions.stopLoading('GET_ALL_WHAT_IS_WORKING_RESPONSES'));

      throw err;
    });
  }
}