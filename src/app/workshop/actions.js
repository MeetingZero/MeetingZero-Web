import axiosInstance from '../../config/axios';

import loadingSlice from '../loading/slice';
import workshopSlice from '../workshop/slice';

export const createWorkshop = (workshop, emails, dateTimePlanned) => {
  return (dispatch) => {
    dispatch(loadingSlice.actions.startLoading('CREATING_NEW_WORKSHOP'));

    return axiosInstance()
    .post('/api/v1/workshops', {
      purpose: workshop.purpose,
      template: "BRANCH_1",
      emails,
      date_time_planned: dateTimePlanned
    })
    .then((response) => {
      dispatch(loadingSlice.actions.stopLoading('CREATING_NEW_WORKSHOP'));

      return response.data;
    })
    .catch((err) => {
      dispatch(loadingSlice.actions.stopLoading('CREATING_NEW_WORKSHOP'));

      throw err.response.data;
    });
  }
}

export const getDirector = (workshopToken) => {
  return (dispatch) => {
    dispatch(loadingSlice.actions.startLoading('GET_WORKSHOP_DIRECTOR'));

    return axiosInstance()
    .get(`/api/v1/workshops/${workshopToken}/director`)
    .then((response) => {
      return dispatch(workshopSlice.actions.setWorkshopDirector(response.data));
    })
    .catch((err) => {
      dispatch(loadingSlice.actions.stopLoading('GET_WORKSHOP_DIRECTOR'));

      throw err;
    });
  }
}

export const getCurrentStep = (workshopToken) => {
  return (dispatch) => {
    dispatch(loadingSlice.actions.startLoading('GET_CURRENT_WORKSHOP_STEP'));

    return axiosInstance()
    .get(`/api/v1/workshops/${workshopToken}/director/current`)
    .then((response) => {
      dispatch(loadingSlice.actions.stopLoading('GET_CURRENT_WORKSHOP_STEP'));

      return dispatch(workshopSlice.actions.setCurrentWorkshopStep(response.data));
    })
    .catch((err) => {
      dispatch(loadingSlice.actions.stopLoading('GET_CURRENT_WORKSHOP_STEP'));

      throw err;
    });
  }
}

export const getWorkshop = (workshopToken) => {
  return (dispatch) => {
    dispatch(loadingSlice.actions.startLoading('GET_WORKSHOP'));

    return axiosInstance()
    .get(`/api/v1/workshops/${workshopToken}`)
    .then((response) => {
      dispatch(loadingSlice.actions.stopLoading('GET_WORKSHOP'));

      return dispatch(workshopSlice.actions.setWorkshop(response.data));
    })
    .catch((err) => {
      dispatch(loadingSlice.actions.stopLoading('GET_WORKSHOP'));

      throw err;
    });
  }
}

export const getMyWorkshops = () => {
  return (dispatch) => {
    dispatch(loadingSlice.actions.startLoading('GET_MY_WORKSHOPS'));

    return axiosInstance()
    .get(`/api/v1/workshops`)
    .then((response) => {
      dispatch(loadingSlice.actions.stopLoading('GET_MY_WORKSHOPS'));

      return dispatch(workshopSlice.actions.setMyWorkshops(response.data));
    })
    .catch((err) => {
      dispatch(loadingSlice.actions.stopLoading('GET_MY_WORKSHOPS'));

      throw err;
    });
  }
}

export const getWorkshopMembers = (workshopToken) => {
  return (dispatch) => {
    dispatch(loadingSlice.actions.startLoading('GET_WORKSHOP_MEMBERS'));

    return axiosInstance()
    .get(`/api/v1/workshops/${workshopToken}/members`)
    .then((response) => {
      dispatch(loadingSlice.actions.stopLoading('GET_WORKSHOP_MEMBERS'));

      return dispatch(workshopSlice.actions.setWorkshopMembers(response.data));
    })
    .catch((err) => {
      dispatch(loadingSlice.actions.stopLoading('GET_WORKSHOP_MEMBERS'));

      throw err;
    });
  }
}

export const startWorkshop = (workshopToken) => {
  return (dispatch) => {
    dispatch(loadingSlice.actions.startLoading('STARTING_WORKSHOP'));

    return axiosInstance()
    .put(`/api/v1/workshops/${workshopToken}/start`)
    .then((response) => {
      dispatch(loadingSlice.actions.stopLoading('STARTING_WORKSHOP'));

      return response.data;
    })
    .catch((err) => {
      dispatch(loadingSlice.actions.stopLoading('STARTING_WORKSHOP'));

      throw err.response.data;
    });
  }
}

export const validateWorkshop = (workshopToken, userId, email) => {
  return (dispatch) => {
    dispatch(loadingSlice.actions.startLoading('VALIDATING_WORKSHOP'));

    return axiosInstance()
    .post(`/api/v1/workshops/${workshopToken}/validate`, {
      email,
      user_id: userId
    })
    .then((response) => {
      dispatch(loadingSlice.actions.stopLoading('VALIDATING_WORKSHOP'));

      return response.data;
    })
    .catch((err) => {
      dispatch(loadingSlice.actions.stopLoading('VALIDATING_WORKSHOP'));

      throw err.response.data;
    });
  }
}

export const completeWorkshopStep = (workshopToken, workshopStageStepId) => {
  return (dispatch) => {
    dispatch(loadingSlice.actions.startLoading('COMPLETING_WORKSHOP_STEP'));

    return axiosInstance()
    .put(`/api/v1/workshops/${workshopToken}/complete-step`, {
      workshop_stage_step_id: workshopStageStepId
    })
    .then((response) => {
      dispatch(loadingSlice.actions.stopLoading('COMPLETING_WORKSHOP_STEP'));

      return response.data;
    })
    .catch((err) => {
      dispatch(loadingSlice.actions.stopLoading('COMPLETING_WORKSHOP_STEP'));

      throw err.response.data;
    });
  }
}

export const getWorkshopSummary = (workshopToken) => {
  return (dispatch) => {
    dispatch(loadingSlice.actions.startLoading('GET_WORKSHOP_SUMMARY'));

    return axiosInstance()
    .get(`/api/v1/workshops/${workshopToken}/summary`)
    .then((response) => {
      dispatch(loadingSlice.actions.stopLoading('GET_WORKSHOP_SUMMARY'));

      return dispatch(workshopSlice.actions.setWorkshopSummary(response.data));
    })
    .catch((err) => {
      dispatch(loadingSlice.actions.stopLoading('GET_WORKSHOP_SUMMARY'));

      throw err;
    });
  }
}
