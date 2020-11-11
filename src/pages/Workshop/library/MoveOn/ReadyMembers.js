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
            className={cn("fa", rwm.ready_workshop_member ? "fa-user text-primary" : "fa-user-times text-muted")}
          />
        );
      })}
    </div>
  );
}

export default ReadyMembers;