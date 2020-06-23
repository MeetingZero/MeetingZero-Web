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

  if (workshopDirectorGroup === 0 || !currentWorkshopStep) {
    return null;
  }

  return (
    <ul className="workshop-sidebar-pills">
      {Object.keys(workshopDirectorGroup).map((key) => {
        const workshopDirector = workshopDirectorGroup[key];

        return (
          <li key={key}>
            <Button href="#" text={workshopDirector[0].workshop_stage.name} className={currentWorkshopStep.workshop_stage_id === workshopDirector[0].workshop_stage_id ? 'active' : ''} />

            <ul>
              {workshopDirector.map((wd) => {
                return (
                  <li key={wd.id}>
                    <Button href="#" text={`- ${wd.workshop_stage_step.name}`} />
                  </li>
                )
              })}
            </ul>
          </li>
        )
      })}
    </ul>
  );
}

export default WorkshopSidebar;