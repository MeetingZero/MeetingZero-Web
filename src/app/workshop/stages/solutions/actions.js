import axiosInstance from '../../../../config/axios';

import loadingSlice from '../../../loading/slice';
import solutionsSlice from './slice';

export const saveResponse = (workshopToken, responseText) => {
  return (dispatch) => {
    dispatch(loadingSlice.actions.startLoading('SAVE_SOLUTIONS_RESPONSE'));

    return axiosInstance()
    .post(`/api/v1/workshops/${workshopToken}/solutions`, { response_text: responseText })
    .then((response) => {
      dispatch(loadingSlice.actions.stopLoading('SAVE_SOLUTIONS_RESPONSE'));

      return dispatch(solutionsSlice.actions.setMySolutionsResponses(response.data));
    })
    .catch((err) => {
      dispatch(loadingSlice.actions.stopLoading('SAVE_SOLUTIONS_RESPONSE'));

      throw err;
    });
  }
}

export const updateResponse = (workshopToken, responseId, responseText) => {
  return (dispatch) => {
    dispatch(loadingSlice.actions.startLoading('SAVE_SOLUTIONS_RESPONSE'));

    return axiosInstance()
    .put(`/api/v1/workshops/${workshopToken}/solutions/${responseId}`, { response_text: responseText })
    .then((response) => {
      dispatch(loadingSlice.actions.stopLoading('SAVE_SOLUTIONS_RESPONSE'));

      return dispatch(solutionsSlice.actions.setMySolutionsResponses(response.data));
    })
    .catch((err) => {
      dispatch(loadingSlice.actions.stopLoading('SAVE_SOLUTIONS_RESPONSE'));

      throw err;
    });
  }
}

export const getMyResponses = (workshopToken) => {
  return (dispatch) => {
    dispatch(loadingSlice.actions.startLoading('GET_MY_SOLUTIONS_RESPONSES'));

    return axiosInstance()
    .get(`/api/v1/workshops/${workshopToken}/solutions?my_filter=true`)
    .then((response) => {
      dispatch(loadingSlice.actions.stopLoading('GET_MY_SOLUTIONS_RESPONSES'));

      return dispatch(solutionsSlice.actions.setMySolutionsResponses(response.data));
    })
    .catch((err) => {
      dispatch(loadingSlice.actions.stopLoading('GET_MY_SOLUTIONS_RESPONSES'));

      throw err;
    });
  }
}

export const getAllResponses = (workshopToken) => {
  return (dispatch) => {
    dispatch(loadingSlice.actions.startLoading('GET_ALL_SOLUTIONS_RESPONSES'));

    return axiosInstance()
    .get(`/api/v1/workshops/${workshopToken}/solutions`)
    .then((response) => {
      dispatch(loadingSlice.actions.stopLoading('GET_ALL_SOLUTIONS_RESPONSES'));

      return dispatch(solutionsSlice.actions.setAllSolutionsResponses(response.data));
    })
    .catch((err) => {
      dispatch(loadingSlice.actions.stopLoading('GET_ALL_SOLUTIONS_RESPONSES'));

      throw err;
    });
  }
}

export const setPriority = (workshopToken, responseId, impactLevel, effortLevel) => {
  return (dispatch) => {
    dispatch(loadingSlice.actions.startLoading('SAVE_SOLUTION_PRIORITY'));

    return axiosInstance()
    .post(`/api/v1/workshops/${workshopToken}/solutions/${responseId}/prioritize`, {
      impact_level: impactLevel,
      effort_level: effortLevel
    })
    .then((response) => {
      dispatch(loadingSlice.actions.stopLoading('SAVE_SOLUTION_PRIORITY'));

      return dispatch(solutionsSlice.actions.setAllSolutionsResponses(response.data));
    })
    .catch((err) => {
      dispatch(loadingSlice.actions.stopLoading('SAVE_SOLUTION_PRIORITY'));

      throw err;
    });
  }
}