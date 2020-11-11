import React from 'react';

import OnlineMembers from './OnlineMembers';

import "./MoveOn.scss";

const MoveOn = () => {
  return (
    <div className="move-on-container">
      <button className="btn btn-primary px-4 btn-block mb-2">Move On</button>

      <OnlineMembers />
    </div>
  );
}

export default MoveOn;