import React from 'react';

import "./EmptyWorkshop.scss";

const EmptyWorkshop = () => {
  return (
    <div className="past-workshops-empty absolute-center-y">
      <i className="fa fa-bicycle text-center mb-1" />

      <h3>Nothing to report.</h3>
    </div>
  );
}

export default EmptyWorkshop;