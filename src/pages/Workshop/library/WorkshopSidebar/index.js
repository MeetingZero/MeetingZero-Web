import React from 'react';
import { useSelector } from 'react-redux';

import Button from '../../../../library/Button';

import './WorkshopSidebar.scss';

const WorkshopSidebar = () => {
  const workshopDirectorGroup = useSelector((state) => {
    return state.Workshop.workshopDirector;
  });

  const currentWorkshopStep = useSelector((state) => {
    return state.Workshop.currentWorkshopStep;
  });

  return (
    <ul className="workshop-sidebar-pills">
      {Object.keys(workshopDirectorGroup).map((key) => {
        const workshopDirector = workshopDirectorGroup[key];

        return (
          <li key={key}>
            <Button href="#" text={workshopDirector[0].workshop_stage.name} className={currentWorkshopStep.workshop_stage_id === workshopDirector[0].workshop_stage_id ? 'active' : ''} />
          </li>
        )
      })}
    </ul>
  );
}

export default WorkshopSidebar;