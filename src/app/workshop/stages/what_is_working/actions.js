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

      return dispatch(whatIsWorkingSlice.actions.setWhatIsWorkingResponses(response.data));
    })
    .catch((err) => {
      dispatch(loadingSlice.actions.stopLoading('SAVE_WHAT_IS_WORKING_RESPONSE'));

      throw err;
    });
  }
}

export const getMyResponses = (workshopToken) => {
  return (dispatch) => {
    dispatch(loadingSlice.actions.startLoading('GET_WHAT_IS_WORKING_RESPONSES'));

    return axiosInstance()
    .get(`/api/v1/workshops/${workshopToken}/what_is_working`)
    .then((response) => {
      dispatch(loadingSlice.actions.stopLoading('GET_WHAT_IS_WORKING_RESPONSES'));

      return dispatch(whatIsWorkingSlice.actions.setMyWhatIsWorkingResponses(response.data));
    })
    .catch((err) => {
      dispatch(loadingSlice.actions.stopLoading('GET_WHAT_IS_WORKING_RESPONSES'));

      throw err;
    });
  }
}