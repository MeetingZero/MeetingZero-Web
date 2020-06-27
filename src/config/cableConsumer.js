import { createConsumer } from '@rails/actioncable';

import { WS_URL } from '../constants/endpoints';

export const cableConsumer = () => {
  return createConsumer(`${WS_URL}?token=${window.localStorage.authToken}`);
}