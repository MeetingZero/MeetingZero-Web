import React from 'react';
import moment from 'moment';

import { lpadZero } from '../../helpers/numberUtils';

import './RingTimer.scss';

const RingTimer = ({ radius, strokeWidth, startTimestamp, expireTimestamp, onTimerExpired }) => {
  const [progress, setProgress] = React.useState(100);
  const [stroke, setStroke] = React.useState('#3F4089');
  const [timerExpired, setTimerExpired] = React.useState(false);
  const [timerDisplay, setTimerDisplay] = React.useState('Start!');

  const expireTime = moment(expireTimestamp);
  const startTime = moment(startTimestamp);

  React.useEffect(() => {
    const interval = window.setInterval(() => {
      const currentTime = moment().utc();
      const secondsDiffFromCurrentTime = expireTime.diff(currentTime, 'seconds');
      const secondsDiffFromStartTime = expireTime.diff(startTime, 'seconds');

      const timeRemainingDuration = moment.duration(secondsDiffFromCurrentTime, 'seconds');

      setTimerDisplay(`${lpadZero(timeRemainingDuration._data.minutes, 2)}:${lpadZero(timeRemainingDuration._data.seconds, 2)}`);

      if (progress >= 0) {
        setProgress((secondsDiffFromCurrentTime / secondsDiffFromStartTime) * 100);
      }
    }, 1000);

    if (timerExpired) {
      window.clearInterval(interval);
      setProgress(100);

      if (onTimerExpired) {
        onTimerExpired();
      }
    }

    return () => window.clearInterval(interval);
  }, [progress, timerExpired, expireTime, startTime, onTimerExpired]);

  React.useEffect(() => {
    if (progress <= 50 && progress > 25) {
      setStroke('#ffc107');
    } else if (progress <= 25) {
      setStroke('#dc3545');
    }
    
    if (progress === 0) {
      setTimerExpired(true);
    }
  }, [progress]);

  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - progress / 100 * circumference;

  return (
    <div className="position-relative d-inline-block">
      <div className="timer-display">
        {timerDisplay}
      </div>

      <svg height={radius * 2} width={radius * 2}>
        <circle
          className={timerExpired ? 'expired' : null}
          stroke={stroke}
          fill='transparent'
          strokeWidth={strokeWidth}
          strokeDasharray={circumference + ' ' + circumference}
          style={{strokeDashoffset}}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
    </div>
  );
}

export default RingTimer;