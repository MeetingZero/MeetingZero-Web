import React from 'react';

import noTalking from 'assets/images/no_talking.svg';
import './Blurb.scss';

const Blurb = ({ title, text }) => {
  return (
    <React.Fragment>
      <img src={noTalking} className="blurb-icon ml-auto mb-1" alt="No Talking" />

      <div className="border border-primary p-2 rounded shadow">
        <div className="text-muted mb-1">
          {title}
        </div>

        <div>
          {text}
        </div>
      </div>
    </React.Fragment>
  );
}

export default Blurb;