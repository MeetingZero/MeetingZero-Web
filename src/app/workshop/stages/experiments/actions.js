import axiosInstance from '../../../../config/axios';

import loadingSlice from '../../../loading/slice';
import experimentsSlice from './slice';

export const getHypothesis = (workshopToken) => {
  return (dispatch) => {
    dispatch(loadingSlice.actions.startLoading('GET_EXPERIMENT_HYPOTHESIS'));

    return axiosInstance()
    .get(`/api/v1/workshops/${workshopToken}/experiments/hypothesis`)
    .then((response) => {
      dispatch(loadingSlice.actions.stopLoading('GET_EXPERIMENT_HYPOTHESIS'));

      return dispatch(experimentsSlice.actions.setHypothesis(response.data));
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

      return dispatch(experimentsSlice.actions.setHypothesis(response.data));
    })
    .catch((err) => {
      dispatch(loadingSlice.actions.stopLoading('SAVE_EXPERIMENT_HYPOTHESIS'));

      throw err;
    });
  }
}

export const getExperimentTasks = (workshopToken) => {
  return (dispatch) => {
    dispatch(loadingSlice.actions.startLoading('GET_EXPERIMENT_TASKS'));

    return axiosInstance()
    .get(`/api/v1/workshops/${workshopToken}/experiments/tasks`)
    .then((response) => {
      dispatch(loadingSlice.actions.stopLoading('GET_EXPERIMENT_TASKS'));

      return dispatch(experimentsSlice.actions.setExperimentTasks(response.data));
    })
    .catch((err) => {
      dispatch(loadingSlice.actions.stopLoading('GET_EXPERIMENT_TASKS'));

      throw err;
    });
  }
}

export const saveTask = (workshopToken, newTask) => {
  return (dispatch) => {
    dispatch(loadingSlice.actions.startLoading('SAVE_EXPERIMENT_TASK'));

    return axiosInstance()
    .post(`/api/v1/workshops/${workshopToken}/experiments/tasks`, {
      response_text: newTask
    })
    .then((response) => {
      dispatch(loadingSlice.actions.stopLoading('SAVE_EXPERIMENT_TASK'));

      return dispatch(experimentsSlice.actions.setExperimentTasks(response.data));
    })
    .catch((err) => {
      dispatch(loadingSlice.actions.stopLoading('SAVE_EXPERIMENT_TASK'));

      throw err;
    });
  }
}

export const updateTask = (workshopToken, taskId, newTask) => {
  return (dispatch) => {
    dispatch(loadingSlice.actions.startLoading('SAVE_EXPERIMENT_TASK'));

    return axiosInstance()
    .put(`/api/v1/workshops/${workshopToken}/experiments/tasks/${taskId}`, {
      response_text: newTask
    })
    .then((response) => {
      dispatch(loadingSlice.actions.stopLoading('SAVE_EXPERIMENT_TASK'));

      return dispatch(experimentsSlice.actions.setExperimentTasks(response.data));
    })
    .catch((err) => {
      dispatch(loadingSlice.actions.stopLoading('SAVE_EXPERIMENT_TASK'));

      throw err;
    });
  }
}
