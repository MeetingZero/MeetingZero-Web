import React from 'react';

import Button from '../../../../library/Button';

import './MeetingSidebar.scss';

const MeetingSidebar = () => {
  return (
    <ul className="meeting-sidebar-pills">
      <li>
        <Button href="google.com" text="What's Working" className="active" />
      </li>

      <li>
        <Button href="google.com" text="Problems" />
      </li>

      <li>
        <Button href="google.com" text="Reframe Problem" />
      </li>

      <li>
        <Button href="google.com" text="Opportunity Question" />
      </li>

      <li>
        <Button href="google.com" text="Solutions" />
      </li>

      <li>
        <Button href="google.com" text="Experiment" />
      </li>
    </ul>
  );
}

export default MeetingSidebar;