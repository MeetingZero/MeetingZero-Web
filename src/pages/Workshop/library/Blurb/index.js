import React from 'react';
import { useSelector } from 'react-redux';
import { Overlay, Tooltip } from 'react-bootstrap';
import moment from 'moment';

import cookies from 'config/cookies';

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

  const workshop = useSelector((state) => {
    return state.Workshop.workshop;
  });

  const noTalkingRef = React.useRef(null);
  const discussionAllowedRef = React.useRef(null);
  const [showNoTalkingTooltip, setShowNoTalkingTooltip] = React.useState(false);
  const [showDiscussionAllowedTooltip, setShowDiscussionAllowedTooltip] = React.useState(false);
  const [showBlurbCallout, setShowBlurbCallout] = React.useState(false);

  React.useEffect(() => {
    let blurbCalloutViewed;

    if (discussionAllowed) {
      blurbCalloutViewed = cookies.get("blurbCalloutViewedDiscussionAllowed");
    } else {
      blurbCalloutViewed = cookies.get("blurbCalloutViewedDiscussionNotAllowed");
    }

    if (blurbCalloutViewed && blurbCalloutViewed[workshop.workshop_token]) {
      setShowBlurbCallout(false);
    } else {
      setShowBlurbCallout(true);
    }
  }, [discussionAllowed, workshop.workshop_token]);

  const handleHideBlurbCallout = () => {
    if (discussionAllowed) {
      cookies.set("blurbCalloutViewedDiscussionAllowed", {
        [workshop.workshop_token]: true
      }, {
        path: "/",
        expires: moment().add(1, "month").toDate()
      });
    } else {
      cookies.set("blurbCalloutViewedDiscussionNotAllowed", {
        [workshop.workshop_token]: true
      }, {
        path: "/",
        expires: moment().add(1, "month").toDate()
      });
    }

    setShowBlurbCallout(false);
  }

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
            onMouseEnter={() => {
              handleHideBlurbCallout();
              setShowNoTalkingTooltip(true);
            }}
            onMouseLeave={() => setShowNoTalkingTooltip(false)}
            className="blurb-icon ml-auto mb-1"
            alt="No Discussion"
          />

          {showBlurbCallout ?
            <div className="blurb-callout blurb-callout-danger">
              <button className="blurb-callout-button">
                Close
              </button>

              This icon means no talking during this step.
            </div>
          : null}
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
