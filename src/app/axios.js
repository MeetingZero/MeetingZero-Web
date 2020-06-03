import axios from 'axios';

export default function() {
  let config = {
    baseUrl: 'http://localhost:3000',
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