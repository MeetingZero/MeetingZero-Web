import axios from 'axios';

import { BASE_URL } from '../constants/endpoints';

export default function() {
  let config = {
    baseURL: BASE_URL,
    timeout: 10000
  };

  const authToken = window
  .localStorage
  .getItem("authToken");

  if (authToken) {
    config.headers = {
      "Authorization": authToken
    };
  }

  return axios.create(config);
}