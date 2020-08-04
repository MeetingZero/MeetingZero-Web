import React from 'react';
import cn from 'classnames'

import lightBulb from 'assets/images/light_bulb.svg';

import './ProTip.scss';

const ProTip = ({ tipText, exampleText }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  console.log(isOpen)

  return (
    <div onClick={() => setIsOpen(true)} className="pro-tip-lightbulb-container">
      <div className="position-relative">
        <div className={cn("pro-tip-box rounded", isOpen ? "d-block" : "d-none")}>
          <i
            onClick={(event) => {
              event.stopPropagation();
              setIsOpen(false);
            }}
            className="fa fa-close pro-tip-box-close text-muted"
          />

          <div className="px-3 pt-3">
            <div className="text-muted small mb-1">
              Pro Tip
            </div>

            <div className={cn("small", exampleText ? "mb-1" : null)}>
              {tipText}
            </div>
          </div>

          {exampleText ?
            <div className="px-2 pb-2">
              <div className="pro-tip-example-text pt-4 pb-2 px-2">
                <div className="text-muted small mb-1">
                  Example
                </div>

                <div className="small">
                  {exampleText}
                </div>
              </div>
            </div>
          : null}
        </div>

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
