import React from 'react';

import noTalking from '../../../../assets/images/no_talking.svg';
import './Blurb.scss';

const Blurb = () => {
  return (
    <React.Fragment>
      <img src={noTalking} className="blurb-icon ml-auto mb-1" alt="No Talking" />

      <div className="border border-primary p-2 rounded shadow">
        <div className="text-muted mb-1">
          Workshop Purpose
        </div>

        <div>
          Figure out a way to turn this Sketch into a functional prototype.
        </div>
      </div>
    </React.Fragment>
  );
}

export default Blurb;