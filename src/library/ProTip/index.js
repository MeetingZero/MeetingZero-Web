import React from 'react';
import cn from 'classnames';
import { CSSTransition } from 'react-transition-group';

import lightBulb from 'assets/images/light_bulb.svg';

import './ProTip.scss';

const ProTip = ({ mainTitle = "Pro Tip", mainText, calloutTitle = "Example", calloutText, position = "bottom-right" }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div onClick={() => setIsOpen(true)} className={cn("pro-tip-lightbulb-container", position)}>
      <div className="position-relative">
        <CSSTransition
          in={isOpen}
          timeout={500}
          classNames="pro-tip"
          unmountOnExit
        >
          <div className="pro-tip-box rounded">
            <i
              onClick={(event) => {
                event.stopPropagation();
                setIsOpen(false);
              }}
              className="fa fa-close pro-tip-box-close text-muted"
            />

            {mainText ?
              <div className={cn("px-3 pt-3", mainText ? null : "pb-3")}>
                <div className="text-muted small mb-1">
                  {mainTitle}
                </div>

                <div className={cn("small", calloutText ? "mb-1" : null)}>
                  {mainText}
                </div>
              </div>
            : null}

            {calloutText ?
              <div className="px-2 pb-2">
                <div className="pro-tip-example-text pt-4 pb-2 px-2">
                  <div className="text-muted small mb-1">
                    {calloutTitle}
                  </div>

                  <div className="small">
                    {calloutText}
                  </div>
                </div>
              </div>
            : null}
          </div>
        </CSSTransition>

        <img
          src={lightBulb}
          className="pro-tip-lightbulb"
          alt="Pro Tip Lightbulb"
        />
      </div>
    </div>
  );
}

export default ProTip;
