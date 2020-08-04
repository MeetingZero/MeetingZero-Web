import axiosInstance from '../../../../config/axios';

import loadingSlice from '../../../loading/slice';
import opportunityQuestionSlice from './slice';

export const saveResponse = (workshopToken, responseText) => {
  return (dispatch) => {
    dispatch(loadingSlice.actions.startLoading('SAVE_OPPORTUNITY_QUESTION_RESPONSE'));

    return axiosInstance()
    .post(`/api/v1/workshops/${workshopToken}/opportunity_question`, { response_text: responseText })
    .then((response) => {
      dispatch(loadingSlice.actions.stopLoading('SAVE_OPPORTUNITY_QUESTION_RESPONSE'));

      return dispatch(opportunityQuestionSlice.actions.setMyOpportunityQuestionResponse(response.data));
    })
    .catch((err) => {
      dispatch(loadingSlice.actions.stopLoading('SAVE_OPPORTUNITY_QUESTION_RESPONSE'));

      throw err;
    });
  }
}

export const updateResponse = (workshopToken, responseId, responseText) => {
  return (dispatch) => {
    dispatch(loadingSlice.actions.startLoading('SAVE_OPPORTUNITY_QUESTION_RESPONSE'));

    return axiosInstance()
    .put(`/api/v1/workshops/${workshopToken}/opportunity_question/${responseId}`, { response_text: responseText })
    .then((response) => {
      dispatch(loadingSlice.actions.stopLoading('SAVE_OPPORTUNITY_QUESTION_RESPONSE'));

      return dispatch(opportunityQuestionSlice.actions.setMyOpportunityQuestionResponse(response.data));
    })
    .catch((err) => {
      dispatch(loadingSlice.actions.stopLoading('SAVE_OPPORTUNITY_QUESTION_RESPONSE'));

      throw err;
    });
  }
}

export const getMyResponse = (workshopToken) => {
  return (dispatch) => {
    dispatch(loadingSlice.actions.startLoading('GET_MY_OPPORTUNITY_QUESTION_RESPONSE'));

    return axiosInstance()
    .get(`/api/v1/workshops/${workshopToken}/opportunity_question`)
    .then((response) => {
      dispatch(loadingSlice.actions.stopLoading('GET_MY_OPPORTUNITY_QUESTION_RESPONSE'));

      return dispatch(opportunityQuestionSlice.actions.setMyOpportunityQuestionResponse(response.data));
    })
    .catch((err) => {
      dispatch(loadingSlice.actions.stopLoading('GET_MY_OPPORTUNITY_QUESTION_RESPONSE'));

      throw err;
    });
  }
}
