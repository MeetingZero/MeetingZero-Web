import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

import "./OnlineMembers.scss";

import * as workshopActions from 'app/workshop/actions';

const ReadyMembers = ({
  workshopToken,
  workshopDirectorId,
  className
}) => {
  const dispatch = useDispatch();

  const [displayMembers, setDisplayMembers] = React.useState([]);

  React.useEffect(() => {
    dispatch(workshopActions.getReadyMembers(workshopToken, workshopDirectorId));
  }, [dispatch, workshopToken, workshopDirectorId]);

  const readyWorkshopMembers = useSelector((state) => {
    return state.Workshop.readyWorkshopMembers;
  });

  const workshopMembers = useSelector((state) => {
    return state.Workshop.workshopMembers;
  });

  React.useEffect(() => {
    const adjustedMembers = workshopMembers.map((wm) => {
      for (let i = 0; i < readyWorkshopMembers.length; i++) {
        if (readyWorkshopMembers[i].user_id === wm.user_id) {
          return {
            ...wm,
            isReady: true
          }
        }

        return {
          ...wm,
          isReady: false
        }
      }
    });

    setDisplayMembers(adjustedMembers.sort((a, b) => {
      return b.isReady - a.isReady;
    }));
  }, [readyWorkshopMembers, workshopMembers]);

  console.log(readyWorkshopMembers);

  return (
    <div className={cn("online-members", className)}>
      {displayMembers.map((dm, index) => {
        return (
          <i
            key={index}
            className={cn("fa", dm && dm.isReady ? "fa-user text-primary" : "fa-user-times text-muted")}
          />
        );
      })}
    </div>
  );
}

export default ReadyMembers;