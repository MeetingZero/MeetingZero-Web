import axios from 'axios';

export default function() {
  let baseUrl;

  if (process.env.NODE_ENV === 'development') {
    baseUrl = 'http://localhost:3000';
  } else if (process.env.REACT_APP_ENV === 'staging') {
    baseUrl = 'https://api-dev.meetingzero.net';
  } else if (process.env.NODE_ENV === 'production') {
    baseUrl = 'https://api.meetingzero.net';
  }

  let config = {
    baseURL: baseUrl,
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