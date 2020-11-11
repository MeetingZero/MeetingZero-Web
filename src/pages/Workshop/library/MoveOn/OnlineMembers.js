import React from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import "./OnlineMembers.scss";

const OnlineMembers = ({ className }) => {
  const workshopMembers = useSelector((state) => {
    return state.Workshop.workshopMembers;
  });

  return (
    <div className={cn("online-members", className)}>
      {workshopMembers.map((wm) => {
        return (
          <i key={wm.id} className={cn("fa fa-user", wm.online ? "text-primary" : "text-muted")} />
        );
      })}
    </div>
  );
}

export default OnlineMembers;