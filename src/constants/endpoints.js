let baseUrl;
let wsUrl;

if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://localhost:3000';
  wsUrl = 'ws://localhost:3000/cable';
} else if (process.env.REACT_APP_ENV === 'staging') {
  baseUrl = 'https://api-staging.meetingzero.net';
  wsUrl = 'wss://api-staging.meetingzero.net/cable';
} else if (process.env.NODE_ENV === 'production') {
  baseUrl = 'https://api.meetingzero.net';
  wsUrl = 'wss://api.meetingzero.net/cable';
}

export const BASE_URL = baseUrl;
export const WS_URL = wsUrl;

export const SENTRY_URL = "https://00b9c02e492644b7b3ceb423c2e38b51@o459140.ingest.sentry.io/5457814";