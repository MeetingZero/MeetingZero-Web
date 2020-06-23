import React from 'react';

import './RingTimer.scss';

const RingTimer = ({ radius, strokeWidth, progress }) => {
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
          stroke='#3F4089'
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