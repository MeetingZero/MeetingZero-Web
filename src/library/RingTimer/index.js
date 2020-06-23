import React from 'react';

import './RingTimer.scss';

const RingTimer = ({ radius, strokeWidth }) => {
  const [progress, setProgress] = React.useState(100);
  const [stroke, setStroke] = React.useState('#3F4089');
  const [timerExpired, setTimerExpired] = React.useState(false);

  React.useEffect(() => {
    const interval = window.setInterval(() => {
      if (progress > 0) {
        setProgress(progress - 10);
      }
    }, 1000);

    if (timerExpired) {
      window.clearInterval(interval);
      setProgress(100);
    }

    return () => window.clearInterval(interval);
  }, [progress, timerExpired]);

  React.useEffect(() => {
    if (progress <= 50 && progress > 10) {
      setStroke('#ffc107');
    } else if (progress <= 15) {
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
        12:00
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