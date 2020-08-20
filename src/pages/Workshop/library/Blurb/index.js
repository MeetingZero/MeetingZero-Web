import React from 'react';
import { useSelector } from 'react-redux';

import noTalking from 'assets/images/no_talking.svg';
import talking from 'assets/images/talking.svg';
import './Blurb.scss';

const Blurb = ({ title, text }) => {
  const discussionAllowed = useSelector((state) => {
    return state
    .Workshop
    .currentWorkshopStep
    .workshop_stage_step
    .discussion_allowed;
  });

  return (
    <div className="blurb-container">
      {discussionAllowed ?
        <img src={talking} className="blurb-icon ml-auto mb-1" alt="Discussion Allowed" />
      :
        <img src={noTalking} className="blurb-icon ml-auto mb-1" alt="No Discussion" />
      }

      <div className="border border-primary p-2 rounded shadow">
        <div className="text-muted mb-1">
          {title}
        </div>

        <div>
          {text}
        </div>
      </div>
    </div>
  );
}

export default Blurb;