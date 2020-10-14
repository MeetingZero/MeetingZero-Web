import React from 'react';
import cn from 'classnames';

import './PulseLoader.scss';

const PulseLoader = ({
  className,
  size = '10rem'
}) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size
      }}
      className={cn("pulse-loader absolute-center-y", className)}
    />
  );
}

export default PulseLoader;