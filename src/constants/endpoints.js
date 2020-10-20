let baseUrl;
let wsUrl;

if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://localhost:3000';
  wsUrl = 'ws://localhost:8080/cable';
} else if (process.env.REACT_APP_ENV === 'staging') {
  baseUrl = 'https://api-staging.meetingzero.net';
  wsUrl = 'wss://api-staging.meetingzero.net/cable';
} else if (process.env.NODE_ENV === 'production') {
  baseUrl = 'https://api.meetingzero.net';
  wsUrl = 'wss://api.meetingzero.net/cable';
}

export const BASE_URL = baseUrl;
export const WS_URL = wsUrl;

let sentryUrl;

if (process.env.REACT_APP_ENV === 'staging') {
  sentryUrl = "https://00b9c02e492644b7b3ceb423c2e38b51@o459140.ingest.sentry.io/5457814";
} else if (process.env.NODE_ENV === 'production') {
  sentryUrl = "https://0b215b923c774e90b1609d979ab25d35@o459140.ingest.sentry.io/5457939";
}

export const SENTRY_URL = sentryUrl;
