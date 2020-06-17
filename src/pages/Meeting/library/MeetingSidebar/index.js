import React from 'react';

import Button from '../../../../library/Button';

import './MeetingSidebar.scss';

const MeetingSidebar = () => {
  return (
    <ul className="meeting-sidebar-pills">
      <li>
        <Button href="#" text="What's Working" className="active" />
      </li>

      <li>
        <Button href="#" text="Problems" />
      </li>

      <li>
        <Button href="#" text="Reframe Problem" />
      </li>

      <li>
        <Button href="#" text="Opportunity Question" />
      </li>

      <li>
        <Button href="#" text="Solutions" />
      </li>

      <li>
        <Button href="#" text="Experiment" />
      </li>
    </ul>
  );
}

export default MeetingSidebar;