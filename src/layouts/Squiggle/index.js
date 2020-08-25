import React from 'react';

import logo from '../../assets/images/logo.svg';
import './Squiggle.scss';

const Squiggle = ({ children }) => {
  return (
    <div className="squiggle-background">
      <div className="container-fluid container-fixed">
        <div className="row">
          <div className="col-5 vh-100">
            <img src={logo} className="squiggle-logo" alt="Squiggle Logo" />
          </div>

          <div className="col-7 vh-100 overflow-y-scroll">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Squiggle;