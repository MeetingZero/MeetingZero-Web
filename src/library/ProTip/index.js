import React from 'react';

import lightBulb from 'assets/images/light_bulb.svg';

import './ProTip.scss';

const ProTip = () => {
  return (
    <img src={lightBulb} className="pro-tip-lightbulb" alt="Pro Tip Lightbulb" />
  );
}

export default ProTip;