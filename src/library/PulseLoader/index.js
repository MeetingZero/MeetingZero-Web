import React from 'react';
import cn from 'classnames';

import './PulseLoader.scss';

const PulseLoader = ({ className }) => {
  return (
    <div className={cn("pulse-loader", className)} />
  );
}

export default PulseLoader;