import React from 'react';
import { useSelector } from 'react-redux';
import { Overlay, Tooltip } from 'react-bootstrap';

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

  const noTalkingRef = React.useRef(null);
  const discussionAllowedRef = React.useRef(null);
  const [showNoTalkingTooltip, setShowNoTalkingTooltip] = React.useState(false);
  const [showDiscussionAllowedTooltip, setShowDiscussionAllowedTooltip] = React.useState(false);

  return (
    <div className="blurb-container">
      {discussionAllowed ?
        <React.Fragment>
          <Overlay
            target={discussionAllowedRef.current}
            show={showDiscussionAllowedTooltip}
            placement="top"
          >
            {(props) => (
              <Tooltip {...props}>
                You can talk now
              </Tooltip>
            )}
          </Overlay>

          <img
            src={talking}
            ref={discussionAllowedRef}
            onMouseEnter={() => setShowDiscussionAllowedTooltip(true)}
            onMouseLeave={() => setShowDiscussionAllowedTooltip(false)}
            className="blurb-icon ml-auto mb-1"
            alt="Discussion Allowed"
          />
        </React.Fragment>
      :
        <React.Fragment>
          <Overlay
            target={noTalkingRef.current}
            show={showNoTalkingTooltip}
            placement="top"
          >
            {(props) => (
              <Tooltip {...props}>
                No talking during this step
              </Tooltip>
            )}
          </Overlay>

          <img
            src={noTalking}
            ref={noTalkingRef}
            onMouseEnter={() => setShowNoTalkingTooltip(true)}
            onMouseLeave={() => setShowNoTalkingTooltip(false)}
            className="blurb-icon ml-auto mb-1"
            alt="No Discussion"
          />
        </React.Fragment>
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