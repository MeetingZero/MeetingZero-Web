import React from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import "./OnlineMembers.scss";

const OnlineMembers = () => {
  const workshopMembers = useSelector((state) => {
    return state.Workshop.workshopMembers;
  });

  return (
    <div className="online-members">
      {workshopMembers.map((wm) => {
        return (
          <i key={wm.id} className={cn("fa fa-user", wm.online ? "text-muted" : "text-primary")} />
        );
      })}
    </div>
  );
}

export default OnlineMembers;