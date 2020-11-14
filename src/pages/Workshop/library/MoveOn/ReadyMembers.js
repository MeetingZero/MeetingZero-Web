import React from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

const ReadyMembers = ({ className }) => {
  const readyWorkshopMembers = useSelector((state) => {
    return state.Workshop.readyWorkshopMembers;
  });

  return (
    <div className={cn("move-on-members", className)}>
      {readyWorkshopMembers.map((rwm) => {
        return (
          <i
            key={rwm.id}
            className={cn("fa fa-user", rwm.ready_workshop_member ? "text-primary" : "text-muted")}
          />
        );
      })}
    </div>
  );
}

export default ReadyMembers;