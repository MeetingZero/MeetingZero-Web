import axiosInstance from '../../../../config/axios';

import loadingSlice from '../../../loading/slice';
import experimentSlice from './slice';

export const getHypothesis = (workshopToken) => {
  return (dispatch) => {
    dispatch(loadingSlice.actions.startLoading('GET_EXPERIMENT_HYPOTHESIS'));

    return axiosInstance()
    .get(`/api/v1/workshops/${workshopToken}/experiments/hypothesis`)
    .then((response) => {
      dispatch(loadingSlice.actions.stopLoading('GET_EXPERIMENT_HYPOTHESIS'));

      return dispatch(experimentSlice.actions.setHypothesis(response.data));
    })
    .catch((err) => {
      dispatch(loadingSlice.actions.stopLoading('GET_EXPERIMENT_HYPOTHESIS'));

      throw err;
    });
  }
}

export const saveHypothesis = (workshopToken, weBelieveText, willResultInText, succeededWhenText) => {
  return (dispatch) => {
    dispatch(loadingSlice.actions.startLoading('SAVE_EXPERIMENT_HYPOTHESIS'));

    return axiosInstance()
    .post(`/api/v1/workshops/${workshopToken}/experiments/hypothesis`, {
      we_believe_text: weBelieveText,
      will_result_in_text: willResultInText,
      succeeded_when_text: succeededWhenText
    })
    .then((response) => {
      dispatch(loadingSlice.actions.stopLoading('SAVE_EXPERIMENT_HYPOTHESIS'));

      return dispatch(experimentSlice.actions.setHypothesis(response.data));
    })
    .catch((err) => {
      dispatch(loadingSlice.actions.stopLoading('SAVE_EXPERIMENT_HYPOTHESIS'));

      throw err;
    });
  }
}
