import React from 'react';

import './RingTimer.scss';

const RingTimer = ({ radius, stroke, progress }) => {
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  const strokeDashoffset = circumference - progress / 100 * circumference;

  return (
    <svg height={radius * 2} width={radius * 2}>
      <circle
        stroke="#3F4089"
        fill="transparent"
        strokeWidth={ stroke }
        strokeDasharray={ circumference + ' ' + circumference }
        style={ { strokeDashoffset } }
        r={ normalizedRadius }
        cx={ radius }
        cy={ radius }
      />
    </svg>
  );
}

export default RingTimer;