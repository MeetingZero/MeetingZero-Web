import { createConsumer } from '@rails/actioncable';

import { WS_URL } from '../constants/endpoints';

export const cableConsumer = (workshopToken) => {
  return createConsumer(`${WS_URL}?token=${window.localStorage.authToken}&workshop_token=${workshopToken}`);
}