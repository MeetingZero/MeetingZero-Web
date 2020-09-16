import React from 'react';
import { CSSTransition } from 'react-transition-group';

import infoTipIcon from 'assets/images/info_tip.svg';

import './InfoTip.scss';

const InfoTip = ({ title, text, styles }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className="info-tip-icon-container"
      style={styles}
    >
      <div className="position-relative">
        <CSSTransition
          in={isOpen}
          timeout={500}
          classNames="info-tip"
          unmountOnExit
        >
          <div className="info-tip-box rounded">
            <i
              onClick={(event) => {
                event.stopPropagation();
                setIsOpen(false);
              }}
              className="fa fa-close info-tip-box-close text-muted"
            />

            <div className="small font-weight-bold mb-1">
              {title}
            </div>

            <div>
              {text}
            </div>
          </div>
        </CSSTransition>

        <img
          src={infoTipIcon}
          className="info-tip-icon"
          alt="Info Tip Icon"
        />
      </div>
    </div>
  );
}

export default InfoTip;
