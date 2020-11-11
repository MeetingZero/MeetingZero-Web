import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

import * as workshopActions from 'app/workshop/actions';

const ReadyMembers = ({
  workshopToken,
  workshopDirectorId,
  className
}) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(workshopActions.getReadyMembers(workshopToken, workshopDirectorId));
  }, [dispatch, workshopToken, workshopDirectorId]);

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